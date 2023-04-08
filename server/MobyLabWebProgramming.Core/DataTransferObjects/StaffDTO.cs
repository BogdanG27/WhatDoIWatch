using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class StaffDTO
{
    public Guid Id { get; set; }
    public String FirstName { get; set; } = default!;
    public String LastName { get; set; } = default!;
    public DateTime Birthdate { get; set; } = default!;
    public GenderEnum Gender { get; set; } = default!;
    public StaffTypeEnum Type { get; set; } = default!;
}