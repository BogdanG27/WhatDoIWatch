using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class UserMovieConfiguration : IEntityTypeConfiguration<UserMovie>
{
    public void Configure(EntityTypeBuilder<UserMovie> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasOne(e => e.User)
            .WithMany(e => e.FavoriteMovies)
            .HasForeignKey(e => e.UserId)
            .HasPrincipalKey(e => e.Id)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(e => e.Movie)
            .WithMany(e => e.FavouriteUsers)
            .HasForeignKey(e => e.MovieId)
            .HasPrincipalKey(e => e.Id)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}