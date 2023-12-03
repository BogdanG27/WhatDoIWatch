namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class UserMovieDTO
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid MovieId { get; set; }
}