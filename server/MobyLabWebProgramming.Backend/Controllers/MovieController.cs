using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Core.Requests;

namespace MobyLabWebProgramming.Api.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class MovieController : AuthorizedController
{
    private readonly IMovieService _movieService;
    public MovieController(IUserService userService, IMovieService movieService) : base(userService)
    {
        _movieService = movieService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<MovieDTO>>> GetById([FromRoute] Guid id)
    {
        return this.FromServiceResponse(await _movieService.GetMovie(id));
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<MovieDTO>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination)
    {
        return this.FromServiceResponse(await _movieService.GetMovies(pagination));
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] MovieAddDTO movie)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _movieService.AddMovie(movie, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> Update([FromBody] MovieUpdateDTO movie)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _movieService.UpdateMovie(movie)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _movieService.DeleteMovie(id)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}