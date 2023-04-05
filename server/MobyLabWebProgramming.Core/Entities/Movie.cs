using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

public class Movie : Media
{
    public string Duration { get; set; } = default!;
}