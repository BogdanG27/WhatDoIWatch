using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IActorService
{
    public Task<ServiceResponse<ActorDTO>> GetActor(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<ActorDTO>>> GetActors(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddActor(ActorAddDTO actor, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateActor(ActorUpdateDTO actor, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteActor(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
}