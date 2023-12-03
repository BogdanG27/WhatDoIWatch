namespace MobyLabWebProgramming.Core.Entities;

public class Movie : Media
{
    public string Duration { get; set; } = default!;
    public ICollection<UserMovie> FavouriteUsers { get; set; } = default!;
}