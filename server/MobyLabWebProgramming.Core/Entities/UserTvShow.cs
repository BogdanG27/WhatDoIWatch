using MobyLabWebProgramming.Core.Entities;

public class UserTvShow : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = default!;

    public Guid TvShowId { get; set; }
    public TvShow TvShow { get; set; } = default!;
}