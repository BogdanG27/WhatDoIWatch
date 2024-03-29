namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class MovieFavouriteDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime ReleaseDate { get; set; } = default!;
    public string Language { get; set; } = default!;
    public string Genre { get; set; } = default!;
    public string ImageUrl { get; set; } = default!;
    public double Rating { get; set; } = default!;
    public int NumberOfRatings { get; set; } = default!;
    public string Duration { get; set; } = default!;
    public ICollection<ActorDTO> Actors { get; set; } = default!;
    public ICollection<StaffDTO> StaffMembers { get; set; } = default!;
    public ICollection<UserDTO> FavouriteUsers { get; set; } = default!;
}