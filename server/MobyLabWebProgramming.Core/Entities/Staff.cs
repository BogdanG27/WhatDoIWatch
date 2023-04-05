using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

public class Staff : Person
{
    public StaffTypeEnum Type { get; set; } = default!;
}