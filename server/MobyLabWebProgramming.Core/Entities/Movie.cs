using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

public class Movie : BaseEntity
{
    public String Name { get; set; } = default!;
    public DateTime ReleaseDate { get; set; } = default!;
    public String Duration { get; set; } = default!;
    public AwardImportanceEnum Award { get; set; } = default!;
}