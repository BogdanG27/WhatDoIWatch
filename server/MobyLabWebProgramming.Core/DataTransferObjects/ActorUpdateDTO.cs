using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public record ActorUpdateDTO(Guid Id, string? FirstName = null, string? LastName = null, DateTime? Birthdate = null, GenderEnum? Gender = null, string? PhotoUrl = null);
