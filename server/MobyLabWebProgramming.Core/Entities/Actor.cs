namespace MobyLabWebProgramming.Core.Entities;

class Actor : Person
{
    public String PhotoUrl { get; set; } = default!;
    public ICollection<Award> Awards { get; set; } = default!;
}