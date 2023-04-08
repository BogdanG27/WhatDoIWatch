namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class SeasonAddSimpleDTO
{
    public int Number { get; set; }
    public int NumberOfEpisodes { get; set; } = default!;
    public string Name { get; set; } = default!;
}