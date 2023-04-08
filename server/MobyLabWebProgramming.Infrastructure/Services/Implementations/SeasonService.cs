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

public class SeasonService : ISeasonService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public SeasonService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<SeasonDTO>> GetSeason(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new SeasonProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<SeasonDTO>.ForSuccess(result) :
            ServiceResponse<SeasonDTO>.FromError(new(HttpStatusCode.Forbidden, "Season not found!", ErrorCodes.NotFound));
    }

    public async Task<ServiceResponse<PagedResponse<SeasonDTO>>> GetSeasons(PaginationSearchQueryParams pagination, CancellationToken cancellationToken)
    {
        var result = await _repository.PageAsync(pagination, new SeasonProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<SeasonDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse> AddSeason(SeasonAddDTO season, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add seasons!", ErrorCodes.CannotAdd));
        }

        await _repository.AddAsync(new Season
        {
            Name = season.Name,
            Number = season.Number,
            NumberOfEpisodes = season.NumberOfEpisodes,
            TvShowId = season.TvShowId
        });

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateSeason(SeasonUpdateDTO season, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can update the staff!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new SeasonSpec(season.Id), cancellationToken);

        if (entity != null)
        {
            entity.Name = season.Name ?? entity.Name;
            entity.Number = season.Number ?? entity.Number;
            entity.NumberOfEpisodes = season.NumberOfEpisodes ?? entity.NumberOfEpisodes;
            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteSeason(Guid id, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete a season!", ErrorCodes.CannotDelete));
        }
        await _repository.DeleteAsync<Season>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
