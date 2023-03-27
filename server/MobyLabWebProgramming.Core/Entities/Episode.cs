namespace MobyLabWebProgramming.Core.Entities;

class Episode : BaseEntity
{
    public String Name { get; set; } = default!;
    public Int16 DurationInMinutes { get; set; } = default!;
    public Int16 SeasonNumber { get; set; } = default!;
}