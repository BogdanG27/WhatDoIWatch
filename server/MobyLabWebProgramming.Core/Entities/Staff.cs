using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

class Staff : Person
{
    public StaffTypeEnum Type { get; set; } = default!;
}