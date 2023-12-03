using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

public class TvShow : Media
{
    public ICollection<Season> Seasons { get; set; } = default!;
    public ICollection<UserTvShow> FavouriteUsers { get; set; } = default!;
}