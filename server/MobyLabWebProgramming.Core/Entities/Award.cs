using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

class Award : BaseEntity
{
    public String Name { get; set; } = default!;
    public AwardImportanceEnum Importance { get; set; } = default!;
}