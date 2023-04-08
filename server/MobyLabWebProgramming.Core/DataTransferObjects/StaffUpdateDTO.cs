using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;


public record StaffUpdateDTO(
    Guid Id,
    String? FirstName = null,
    String? LastName = null,
    DateTime? Birthdate = null,
    GenderEnum? Gender = null,
    StaffTypeEnum? Type = null
);