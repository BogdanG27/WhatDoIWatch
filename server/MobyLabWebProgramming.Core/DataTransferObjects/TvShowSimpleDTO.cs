namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class TvShowSimpleDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string ImageUrl { get; set; } = default!;
    public double Rating { get; set; } = default!;
    public int NumberOfRatings { get; set; } = default!;
}