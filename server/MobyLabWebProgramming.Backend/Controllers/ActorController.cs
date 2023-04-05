using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class ActorController : AuthorizedController
{
    private readonly IActorService _actorService;
    public ActorController(IUserService userService, IActorService actorService) : base(userService)
    {
        _actorService = actorService;
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<ActorDTO>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _actorService.GetActor(id)) :
            this.ErrorMessageResult<ActorDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<ActorDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _actorService.GetActors(pagination)) :
            this.ErrorMessageResult<PagedResponse<ActorDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] ActorAddDTO actor)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _actorService.AddActor(actor, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] ActorUpdateDTO actor)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _actorService.UpdateActor(actor)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _actorService.DeleteActor(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}