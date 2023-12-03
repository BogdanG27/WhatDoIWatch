using MobyLabWebProgramming.Core.Entities;

public class UserMovie : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = default!;

    public Guid MovieId { get; set; }
    public Movie Movie { get; set; } = default!;
}