using Ardalis.Specification;
using MobyLabWebProgramming.Core.Specifications;

public sealed class UserMovieSpec : BaseSpec<UserMovieSpec, UserMovie>
{
    public UserMovieSpec(Guid userId, Guid movieId)
    {
        Query
            .Include(e => e.User)
            .Include(e => e.Movie)
            .Where(e => e.UserId == userId && e.MovieId == movieId);
    }

    public UserMovieSpec()
    {
        
    }
}