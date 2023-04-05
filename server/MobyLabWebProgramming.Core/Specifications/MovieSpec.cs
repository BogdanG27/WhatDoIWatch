using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;
public sealed class MovieSpec : BaseSpec<MovieSpec, Movie>
{
    public MovieSpec(Guid id) : base(id)
    {
    }
}