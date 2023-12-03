using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class MovieFavouriteProjectionSpec : BaseSpec<MovieFavouriteProjectionSpec, Movie, Movie>
{
    protected override Expression<Func<Movie, Movie>> Spec => e => new()
    {
        Id = e.Id,
        Description = e.Description,
        Genre = e.Genre,
        ImageUrl = e.ImageUrl,
        Language = e.Language,
        Name = e.Name,
        NumberOfRatings = e.NumberOfRatings,
        Rating = e.Rating,
        ReleaseDate = e.ReleaseDate,
        Duration = e.Duration,
        Actors = e.Actors,
        StaffMembers = e.StaffMembers,
    };

    public MovieFavouriteProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public MovieFavouriteProjectionSpec(Guid id) : base(id)
    {
    }

    public MovieFavouriteProjectionSpec(Guid userId, string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query
            .Include(e => e.Actors)
            .Include(e => e.StaffMembers)
            .Where(e => EF.Functions.ILike(e.Name, searchExpr));
    }
}