using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using System.Net;

public class UserTvShowService : IUserTvShowService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public UserTvShowService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }
    public async Task<ServiceResponse> AddUserTvShowAssociation(Guid tvShowId, Guid userId, CancellationToken cancellationToken = default)
    {
        await _repository.AddAsync(new UserTvShow
        {
            UserId = userId,
            TvShowId = tvShowId,
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteTvShowForUser(Guid tvShowId, Guid userId, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new UserTvShowSpec(userId, tvShowId), cancellationToken);

        if (result == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "We couldn't find this tv show!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<UserMovie>(result.Id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}