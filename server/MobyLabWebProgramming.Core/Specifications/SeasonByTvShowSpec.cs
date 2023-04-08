using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;
public sealed class SeasonByTvShowSpec : BaseSpec<SeasonByTvShowSpec, Season>
{
    public SeasonByTvShowSpec(Guid tvShowId)
    {
        Query.Where(e => e.TvShowId == tvShowId);
    }
}