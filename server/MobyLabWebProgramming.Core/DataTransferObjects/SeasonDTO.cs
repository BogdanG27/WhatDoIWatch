namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class SeasonDTO
{
    public Guid Id { get; set; }
    public int Number { get; set; }
    public int NumberOfEpisodes { get; set; } = default!;
    public string Name { get; set; } = default!;
    public Guid TvShowId { get; set; } = default!;
}