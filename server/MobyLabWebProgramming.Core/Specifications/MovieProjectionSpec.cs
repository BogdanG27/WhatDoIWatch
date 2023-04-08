using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class MovieProjectionSpec : BaseSpec<MovieProjectionSpec, Movie, MovieDTO>
{
    protected override Expression<Func<Movie, MovieDTO>> Spec => e => new()
    {
        Id = e.Id,
        Description = e.Description,
        Genre = e.Genre,
        ImageUrl = e.ImageUrl,
        Duration = e.Duration,
        Language = e.Language,
        Name = e.Name,
        NumberOfRatings = e.NumberOfRatings,
        Rating = e.Rating,
        ReleaseDate = e.ReleaseDate,
        Actors = e.Actors.Select(a => new ActorDTO
        {
            Id = a.Id,
            Birthdate = a.Birthdate,
            FirstName = a.FirstName,
            Gender = a.Gender,
            LastName = a.LastName,
            PhotoUrl = a.PhotoUrl
        }).ToList(),
        StaffMembers = e.StaffMembers.Select(a => new StaffDTO
        {
            Id = a.Id,
            Birthdate = a.Birthdate,
            FirstName = a.FirstName,
            Gender = a.Gender,
            LastName = a.LastName,
            Type = a.Type
        }).ToList()
    };

    public MovieProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public MovieProjectionSpec(Guid id) : base(id)
    {
    }

    public MovieProjectionSpec(string? search)
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