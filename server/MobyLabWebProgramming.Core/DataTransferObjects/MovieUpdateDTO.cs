namespace MobyLabWebProgramming.Core.DataTransferObjects;

public record MovieUpdateDTO(
    Guid Id,
    int? Accessed,
    string? Name = null,
    string? Description = null,
    DateTime? ReleaseDate = null,
    string? Language = null,
    string? Genre = null,
    string? ImageUrl = null,
    double? Rating = null,
    int? NumberOfRatings = null,
    string? Duration = null,
    ICollection<Guid>? ActorsIds = null,
    ICollection<Guid>? StaffMembersIds = null
);