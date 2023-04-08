using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;
public sealed class TvShowSpec : BaseSpec<TvShowSpec, TvShow>
{
    public TvShowSpec(Guid id) : base(id)
    {
    }

    public TvShowSpec(String name)
    {
        Query.Where(e => e.Name == name);
    }
}