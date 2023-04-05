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

public class ActorService : IActorService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public ActorService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<ActorDTO>> GetActor(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new ActorProjectionSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<ActorDTO>.ForSuccess(result) :
            ServiceResponse<ActorDTO>.FromError(new(HttpStatusCode.Forbidden, "Actor not found!", ErrorCodes.NotFound));
    }

    public async Task<ServiceResponse> AddActor(ActorAddDTO actor, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add actors!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new ActorProjectionSpec(actor.FirstName, actor.LastName), cancellationToken);
        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Actor already exists!", ErrorCodes.CannotAdd));
        }

        await _repository.AddAsync(new Actor
        {
            Birthdate = actor.Birthdate,
            FirstName = actor.FirstName,
            LastName = actor.LastName,
            Gender = actor.Gender,
            PhotoUrl = actor.PhotoUrl
        });

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<PagedResponse<ActorDTO>>> GetActors(PaginationSearchQueryParams pagination, CancellationToken cancellationToken)
    {
        var result = await _repository.PageAsync(pagination, new ActorProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<ActorDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse> UpdateActor(ActorUpdateDTO actor, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can update the user!", ErrorCodes.CannotUpdate));
        }

        var entity = await _repository.GetAsync(new ActorSpec(actor.Id), cancellationToken);

        if (entity != null)
        {
            entity.LastName = actor.LastName;
            entity.FirstName = actor.FirstName;
            entity.Birthdate = actor.Birthdate;
            entity.Gender = actor.Gender;
            entity.PhotoUrl = actor.PhotoUrl;
            await _repository.UpdateAsync(entity, cancellationToken);
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteActor(Guid id, UserDTO? requestingUser, CancellationToken cancellationToken)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can delete an actor!", ErrorCodes.CannotDelete));
        }
        await _repository.DeleteAsync<Actor>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
