using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IUserMovieService
{
    public Task<ServiceResponse> AddUserMovieAssociations(Guid movieId, Guid userId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteMovieForUser(Guid movieId, Guid userId, CancellationToken cancellationToken = default);
}