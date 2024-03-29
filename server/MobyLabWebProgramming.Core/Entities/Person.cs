using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

public class Person : BaseEntity
{
    public String FirstName { get; set; } = default!;
    public String LastName { get; set; } = default!;
    public DateTime Birthdate { get; set; } = default!;
    public GenderEnum Gender { get; set; } = default!;
    public ICollection<Movie> Movies { get; set; } = default!;
    public ICollection<TvShow> TvShows { get; set; } = default!;
}