using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

/// <summary>
/// This is a specification to filter the user entities and map it to and UserDTO object via the constructors.
/// Note how the constructors call the base class's constructors. Also, this is a sealed class, meaning it cannot be further derived.
/// </summary>
public sealed class UserFavouritesSpec : BaseSpec<UserFavouritesSpec, User, User>
{
    /// <summary>
    /// This is the projection/mapping expression to be used by the base class to get UserDTO object from the database.
    /// </summary>
    protected override Expression<Func<User, User>> Spec => e => new()
    {
        Id = e.Id,
        Email = e.Email,
        Name = e.Name,
        Role = e.Role,
        FavoriteMovies = e.FavoriteMovies,
        FavoriteTvShows = e.FavoriteTvShows
    };

    public UserFavouritesSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public UserFavouritesSpec(Guid id)
    {
        Query
           .Include(e => e.FavoriteMovies)
           .Include(e => e.FavoriteTvShows)
           .Where(e => e.Id == id);
    }

    public UserFavouritesSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query
            .Include(e => e.FavoriteMovies)
            .Include(e => e.FavoriteTvShows)
            .Where(e => EF.Functions.ILike(e.Name, searchExpr));
    }
}
