using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

public class Season : BaseEntity
{
    public int Number { get; set; }
    public Guid TvShowId { get; set; } = default!;
    public TvShow TvShow { get; set; } = default!;
    public int NumberOfEpisodes { get; set; } = default!;
    public string Name { get; set; } = default!;
}