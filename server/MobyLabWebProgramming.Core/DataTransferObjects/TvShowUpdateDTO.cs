namespace MobyLabWebProgramming.Core.DataTransferObjects;

public record TvShowUpdateDTO(
    Guid Id,
    ICollection<SeasonAddSimpleDTO>? Seasons = null,
    string? Name = null,
    string? Description = null,
    DateTime? ReleaseDate = null,
    string? Language = null,
    string? Genre = null,
    string? ImageUrl = null,
    double? Rating = null,
    int? NumberOfRatings = null,
    ICollection<Guid>? ActorsIds = null,
    ICollection<Guid>? StaffMembersIds = null
);