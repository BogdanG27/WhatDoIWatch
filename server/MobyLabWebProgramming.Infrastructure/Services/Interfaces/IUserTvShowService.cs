using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IUserTvShowService
{
    public Task<ServiceResponse> AddUserTvShowAssociation(Guid movieId, Guid userId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteTvShowForUser(Guid movieId, Guid userId, CancellationToken cancellationToken = default);
}