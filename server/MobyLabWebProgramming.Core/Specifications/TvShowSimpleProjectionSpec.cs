using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class TvShowSimpleProjectionSpec : BaseSpec<TvShowSimpleProjectionSpec, TvShow, TvShowSimpleDTO>
{
    protected override Expression<Func<TvShow, TvShowSimpleDTO>> Spec => e => new()
    {
        Id = e.Id,
        ImageUrl = e.ImageUrl,
        Name = e.Name,
        NumberOfRatings = e.NumberOfRatings,
        Rating = e.Rating,
    };

    public TvShowSimpleProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public TvShowSimpleProjectionSpec(Guid id) : base(id)
    {
    }

    public TvShowSimpleProjectionSpec(string? search)
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