using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface ISeasonService
{
    public Task<ServiceResponse<SeasonDTO>> GetSeason(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<SeasonDTO>>> GetSeasons(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddSeason(SeasonAddDTO season, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateSeason(SeasonUpdateDTO season, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteSeason(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}