using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class TvShowProjectionSpec : BaseSpec<TvShowProjectionSpec, TvShow, TvShowDTO>
{
    protected override Expression<Func<TvShow, TvShowDTO>> Spec => e => new()
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
        }).ToList(),
        Seasons = e.Seasons.Select(e => new SeasonDTO
        {
            Id = e.Id,
            Name = e.Name,
            Number = e.Number,
            NumberOfEpisodes = e.NumberOfEpisodes,
            TvShowId = e.TvShowId
        }).ToList()
    };

    public TvShowProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public TvShowProjectionSpec(Guid id) : base(id)
    {
    }

    public TvShowProjectionSpec(string? search)
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
            .Include(e => e.Seasons)
            .Where(e => EF.Functions.ILike(e.Name, searchExpr));
    }
}