using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using System.Net;

public class UserMovieService : IUserMovieService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public UserMovieService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }
    public async Task<ServiceResponse> AddUserMovieAssociations(Guid movieId, Guid userId, CancellationToken cancellationToken = default)
    {
        await _repository.AddAsync(new UserMovie
        {
            UserId = userId,
            MovieId = movieId,
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteMovieForUser(Guid movieId, Guid userId, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new UserMovieSpec(userId, movieId), cancellationToken);

        if (result == null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "We couldn't find this movie!", ErrorCodes.CannotDelete));
        }

        await _repository.DeleteAsync<UserMovie>(result.Id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}