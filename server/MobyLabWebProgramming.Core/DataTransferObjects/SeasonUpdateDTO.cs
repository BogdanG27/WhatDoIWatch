namespace MobyLabWebProgramming.Core.DataTransferObjects;

public record SeasonUpdateDTO(
    Guid Id,
    int? Number = null,
    string? Name = null,
    int? NumberOfEpisodes = null
);