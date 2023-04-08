using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;
public interface ITvShowService
{
    Task<ServiceResponse<TvShowDTO>> GetTvShow(Guid id, CancellationToken cancellationToken = default);
    Task<ServiceResponse<PagedResponse<TvShowDTO>>> GetTvShows(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    Task<ServiceResponse> AddTvShow(TvShowAddDTO tvShow, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    Task<ServiceResponse> UpdateTvShow(TvShowUpdateDTO tvShow, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    Task<ServiceResponse> DeleteTvShow(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}
