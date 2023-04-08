using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;
public sealed class SeasonSpec : BaseSpec<SeasonSpec, Season>
{
    public SeasonSpec(Guid id) : base(id)
    {
    }
}