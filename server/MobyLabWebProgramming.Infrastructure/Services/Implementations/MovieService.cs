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

public class MovieService : IMovieService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public MovieService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<MovieDTO>> GetMovie(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new MovieProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<MovieDTO>.ForSuccess(result) :
            ServiceResponse<MovieDTO>.FromError(new(HttpStatusCode.NotFound, "Movie not found!", ErrorCodes.NotFound));
    }

    public async Task<ServiceResponse<PagedResponse<MovieDTO>>> GetMovies(PaginationSearchQueryParams pagination, CancellationToken cancellationToken)
    {
        var result = await _repository.PageAsync(pagination, new MovieProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<MovieDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse> AddMovie(MovieAddDTO movie, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add actors!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new MovieProjectionSpec(movie.Name), cancellationToken);
        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Movie already exists!", ErrorCodes.CannotAdd));
        }

        var Actors = new List<Actor>();
        var StaffMembers = new List<Staff>();

        // if I added actors to the
        if (movie.ActorsIds != null)
        {
            foreach (Guid id in movie.ActorsIds)
            {
                var actor = await _repository.GetAsync(new ActorSpec(id), cancellationToken);
                if (actor == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad actor id provided", ErrorCodes.NotFound));
                }
                Actors.Add(actor);
            }
        }

        if (movie.StaffMembersIds != null)
        {
            foreach (Guid id in movie.StaffMembersIds)
            {
                var staffMember = await _repository.GetAsync(new StaffSpec(id), cancellationToken);
                if (staffMember == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad actor id provided", ErrorCodes.NotFound));
                }
                StaffMembers.Add(staffMember);
            }
        }

        await _repository.AddAsync(new Movie
        {
            Description = movie.Description,
            Duration = movie.Duration,
            Name = movie.Name,
            ReleaseDate = movie.ReleaseDate,
            Language = movie.Language,
            Genre = movie.Genre,
            ImageUrl = movie.ImageUrl,
            Rating = movie.Rating,
            NumberOfRatings = movie.NumberOfRatings,
            Actors = Actors,
            StaffMembers = StaffMembers
        });

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateMovie(MovieUpdateDTO movie, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can update the user!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new MovieSpec(movie.Id), cancellationToken);

        var Actors = new List<Actor>();
        var StaffMembers = new List<Staff>();

        // if I added actors to the
        if (movie.ActorsIds != null)
        {
            foreach (Guid id in movie.ActorsIds)
            {
                var actor = await _repository.GetAsync(new ActorSpec(id), cancellationToken);
                if (actor == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad actor id provided", ErrorCodes.NotFound));
                }
                Actors.Add(actor);
            }
        }

        if (movie.StaffMembersIds != null)
        {
            foreach (Guid id in movie.StaffMembersIds)
            {
                var staffMember = await _repository.GetAsync(new StaffSpec(id), cancellationToken);
                if (staffMember == null)
                {
                    return ServiceResponse.FromError(new(HttpStatusCode.NotFound, "Bad actor id provided", ErrorCodes.NotFound));
                }
                StaffMembers.Add(staffMember);
            }
        }

        if (entity != null)
        {
            entity.Description = movie.Description ?? entity.Description;
            entity.Duration = movie.Duration ?? entity.Duration;
            entity.Name = movie.Name ?? entity.Name;
            entity.ReleaseDate = movie.ReleaseDate ?? entity.ReleaseDate;
            entity.Language = movie.Language ?? entity.Language;
            entity.Genre = movie.Genre ?? entity.Genre;
            entity.ImageUrl = movie.ImageUrl ?? entity.ImageUrl;
            entity.Rating = movie.Rating ?? entity.Rating;
            entity.NumberOfRatings = movie.NumberOfRatings ?? entity.NumberOfRatings;
            entity.StaffMembers = movie.StaffMembersIds == null ? entity.StaffMembers : StaffMembers;
            entity.Actors = movie.ActorsIds == null ? entity.Actors : Actors;

            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteMovie(Guid id, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete a movie!", ErrorCodes.CannotDelete));
        }
        await _repository.DeleteAsync<Movie>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<List<MovieDTO>>> GetMovieRecommandations(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        var movie = await _repository.GetAsync(new MovieProjectionSpec(id), cancellationToken);

        if (movie == null)
        {
            return ServiceResponse<List<MovieDTO>>.FromError(new(HttpStatusCode.NotFound, "Movie does not exist", ErrorCodes.NotFound));
        }

        var result = await _repository.ListAsync(new MovieProjectionSpec(movie, requestingUser), cancellationToken);

        return ServiceResponse<List<MovieDTO>>.ForSuccess(result);
    }
}