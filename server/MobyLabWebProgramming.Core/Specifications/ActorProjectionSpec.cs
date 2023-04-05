using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class ActorProjectionSpec : BaseSpec<ActorProjectionSpec, Actor, ActorDTO>
{
    protected override Expression<Func<Actor, ActorDTO>> Spec => e => new()
    {
        Id = e.Id,
        FirstName = e.FirstName,
        LastName = e.LastName,
        Birthdate = e.Birthdate,
        Gender = e.Gender,
        PhotoUrl = e.PhotoUrl
    };

    public ActorProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public ActorProjectionSpec(Guid id) : base(id)
    {
    }

    public ActorProjectionSpec(String? FirstName, String? LastName)
    {
        if (FirstName == null || LastName == null)
            return;

        Query.Where(e => EF.Functions.ILike(e.FirstName, FirstName) &&
                         EF.Functions.ILike(e.LastName, LastName));
    }

    public ActorProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.FirstName, searchExpr) ||
                         EF.Functions.ILike(e.LastName, searchExpr));
    }
}