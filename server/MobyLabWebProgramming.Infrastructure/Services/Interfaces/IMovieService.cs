using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;
public interface IMovieService
{
    Task<ServiceResponse<MovieDTO>> GetMovie(Guid id, CancellationToken cancellationToken = default);
    Task<ServiceResponse<PagedResponse<MovieDTO>>> GetMovies(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    Task<ServiceResponse> AddMovie(MovieAddDTO movie, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    Task<ServiceResponse> UpdateMovie(MovieUpdateDTO movie, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    Task<ServiceResponse> DeleteMovie(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}
