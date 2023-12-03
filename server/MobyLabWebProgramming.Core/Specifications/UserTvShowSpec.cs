using Ardalis.Specification;
using MobyLabWebProgramming.Core.Specifications;

public sealed class UserTvShowSpec : BaseSpec<UserTvShowSpec, UserTvShow>
{
    public UserTvShowSpec(Guid userId, Guid tvShowId)
    {
        Query
            .Include(e => e.User)
            .Include(e => e.TvShow)
            .Where(e => e.UserId == userId && e.TvShowId == tvShowId);
    }
}