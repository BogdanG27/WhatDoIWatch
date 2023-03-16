namespace MobyLabWebProgramming.Core.Entities;

class Movie : BaseEntity
{
    public String Name { get; set; } = default!;
    public DateTime ReleaseDate { get; set; } = default!;
    public String Duration { get; set; } = default!;
}