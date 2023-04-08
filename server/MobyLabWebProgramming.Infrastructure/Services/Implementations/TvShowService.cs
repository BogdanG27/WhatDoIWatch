using System.Net;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class TvShowService : ITvShowService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly ISeasonService _seasonService;

    public TvShowService(IRepository<WebAppDatabaseContext> repository, ISeasonService seasonService)
    {
        _repository = repository;
        _seasonService = seasonService;
    }

    public async Task<ServiceResponse<TvShowDTO>> GetTvShow(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new TvShowProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<TvShowDTO>.ForSuccess(result) :
            ServiceResponse<TvShowDTO>.FromError(new(HttpStatusCode.NotFound, "TvShow not found!", ErrorCodes.NotFound));
    }

    public async Task<ServiceResponse<PagedResponse<TvShowDTO>>> GetTvShows(PaginationSearchQueryParams pagination, CancellationToken cancellationToken)
    {
        var result = await _repository.PageAsync(pagination, new TvShowProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<TvShowDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse> AddTvShow(TvShowAddDTO tvShow, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add actors!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new TvShowProjectionSpec(tvShow.Name), cancellationToken);
        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "TvShow already exists!", ErrorCodes.CannotAdd));
        }

        var Actors = new List<Actor>();
        var StaffMembers = new List<Staff>();

        // if I added actors to the
        if (tvShow.ActorsIds != null)
        {
            foreach (Guid id in tvShow.ActorsIds)
            {
                var actor = await _repository.GetAsync(new ActorSpec(id), cancellationToken);
                if (actor == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad actor id provided", ErrorCodes.NotFound));
                }
                Actors.Add(actor);
            }
        }

        await _repository.AddAsync(new TvShow
        {
            Description = tvShow.Description,
            Name = tvShow.Name,
            ReleaseDate = tvShow.ReleaseDate,
            Language = tvShow.Language,
            Genre = tvShow.Genre,
            ImageUrl = tvShow.ImageUrl,
            Rating = tvShow.Rating,
            NumberOfRatings = tvShow.NumberOfRatings,
            Actors = Actors,
            StaffMembers = StaffMembers
        });

        var tvShowAdded = await _repository.GetAsync(new TvShowSpec(tvShow.Name), cancellationToken);
        if (tvShowAdded != null)
        {
            if (tvShow.Seasons != null)
            {
                await UpdateTvShow(new TvShowUpdateDTO
                (
                    tvShowAdded.Id,
                    tvShow.Seasons
                ), requestingUser, cancellationToken);
            }
        }


        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateTvShow(TvShowUpdateDTO tvShow, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can update the user!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new TvShowSpec(tvShow.Id), cancellationToken);

        var Actors = new List<Actor>();
        var StaffMembers = new List<Staff>();
        var Seasons = new List<Season>();

        // if I added actors to the
        if (tvShow.ActorsIds != null)
        {
            foreach (Guid id in tvShow.ActorsIds)
            {
                var actor = await _repository.GetAsync(new ActorSpec(id), cancellationToken);
                if (actor == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad actor id provided", ErrorCodes.NotFound));
                }
                Actors.Add(actor);
            }
        }

        if (tvShow.StaffMembersIds != null)
        {
            foreach (Guid id in tvShow.StaffMembersIds)
            {
                var staffMember = await _repository.GetAsync(new StaffSpec(id), cancellationToken);
                if (staffMember == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad actor id provided", ErrorCodes.NotFound));
                }
                StaffMembers.Add(staffMember);
            }
        }

        if (tvShow.Seasons != null)
        {
            var seasonsByTvShow = await _repository.ListAsync(new SeasonByTvShowSpec(tvShow.Id), cancellationToken);
            foreach (Season season1 in seasonsByTvShow)
            {
                await _seasonService.DeleteSeason(season1.Id);
            }
            foreach (SeasonAddSimpleDTO season in tvShow.Seasons)
            {
                await _repository.AddAsync(new Season
                {
                    Name = season.Name,
                    Number = season.Number,
                    NumberOfEpisodes = season.NumberOfEpisodes,
                    TvShowId = tvShow.Id
                });
            }
        }

        var SeasonsByTvShow = await _repository.ListAsync(new SeasonByTvShowSpec(tvShow.Id), cancellationToken);

        if (entity != null)
        {
            entity.Description = tvShow.Description ?? entity.Description;
            entity.Name = tvShow.Name ?? entity.Name;
            entity.ReleaseDate = tvShow.ReleaseDate ?? entity.ReleaseDate;
            entity.Language = tvShow.Language ?? entity.Language;
            entity.Genre = tvShow.Genre ?? entity.Genre;
            entity.ImageUrl = tvShow.ImageUrl ?? entity.ImageUrl;
            entity.Rating = tvShow.Rating ?? entity.Rating;
            entity.NumberOfRatings = tvShow.NumberOfRatings ?? entity.NumberOfRatings;
            entity.StaffMembers = tvShow.StaffMembersIds == null ? entity.StaffMembers : StaffMembers;
            entity.Actors = tvShow.ActorsIds == null ? entity.Actors : Actors;
            entity.Seasons = tvShow.Seasons == null ? entity.Seasons : SeasonsByTvShow;

            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteTvShow(Guid id, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete a tvShow!", ErrorCodes.CannotDelete));
        }
        await _repository.DeleteAsync<TvShow>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}