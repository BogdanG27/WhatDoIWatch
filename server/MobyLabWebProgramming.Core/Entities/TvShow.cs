using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

class TvShow : BaseEntity
{
    public String Name { get; set; } = default!;
    public DateTime ReleaseDate { get; set; } = default!;
    public Int16 SeasonsNumber { get; set; } = default!;
    public ICollection<Episode> Episodes { get; set; } = default!;
    public String EpisodeDuration { get; set; } = default!;
    public AwardImportanceEnum Award { get; set; } = default!;
}