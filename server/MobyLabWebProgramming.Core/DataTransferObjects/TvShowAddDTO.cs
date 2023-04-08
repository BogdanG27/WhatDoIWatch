namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class TvShowAddDTO
{
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime ReleaseDate { get; set; } = default!;
    public string Language { get; set; } = default!;
    public string Genre { get; set; } = default!;
    public string ImageUrl { get; set; } = default!;
    public double Rating { get; set; } = default!;
    public int NumberOfRatings { get; set; } = default!;
    public ICollection<Guid>? ActorsIds { get; set; } = default!;
    public ICollection<Guid>? StaffMembersIds { get; set; } = default!;
    public ICollection<SeasonAddSimpleDTO>? Seasons { get; set; } = default!;
}