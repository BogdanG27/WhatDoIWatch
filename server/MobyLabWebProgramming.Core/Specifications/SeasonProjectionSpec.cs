using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class SeasonProjectionSpec : BaseSpec<SeasonProjectionSpec, Season, SeasonDTO>
{
    protected override Expression<Func<Season, SeasonDTO>> Spec => e => new()
    {
        Id = e.Id,
        Number = e.Number,
        Name = e.Name,
        TvShowId = e.TvShowId,
        NumberOfEpisodes = e.NumberOfEpisodes
    };

    public SeasonProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public SeasonProjectionSpec(Guid id) : base(id)
    {
    }

    public SeasonProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Name, searchExpr));
    }
}