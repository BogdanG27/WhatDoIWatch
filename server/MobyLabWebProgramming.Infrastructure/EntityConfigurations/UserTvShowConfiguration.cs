using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class UserTvShowConfiguration : IEntityTypeConfiguration<UserTvShow>
{
    public void Configure(EntityTypeBuilder<UserTvShow> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasOne(e => e.User)
            .WithMany(e => e.FavoriteTvShows)
            .HasForeignKey(e => e.UserId)
            .HasPrincipalKey(e => e.Id)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(e => e.TvShow)
            .WithMany(e => e.FavouriteUsers)
            .HasForeignKey(e => e.TvShowId)
            .HasPrincipalKey(e => e.Id)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}