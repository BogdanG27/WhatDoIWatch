using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

public abstract class Media : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime ReleaseDate { get; set; } = default!;
    public string Language { get; set; } = default!;
    public string Genre { get; set; } = default!;
    public string ImageUrl { get; set; } = default!;
    public double Rating { get; set; } = default!;
    public int NumberOfRatings { get; set; } = default!;
    public ICollection<Actor> Actors { get; set; } = default!;
    public ICollection<Staff> StaffMembers { get; set; } = default!;
    public ICollection<User> FavouriteUsers { get; set; } = default!;
}