namespace MobyLabWebProgramming.Core.Entities;

public class Episode : BaseEntity
{
    public int SeasonNumber { get; set; } = default!;
    public int EpisodeNumber { get; set; } = default!;
    public TimeSpan Duration { get; set; } = default!;
    public Guid SeasonId { get; set; } = default!;
    public Season Season { get; set; } = default!;

}