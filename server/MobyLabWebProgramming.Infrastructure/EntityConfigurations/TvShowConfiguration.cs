using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class TvShowConfiguration : IEntityTypeConfiguration<TvShow>
{
    public void Configure(EntityTypeBuilder<TvShow> builder)
    {
        builder.Property(m => m.Name)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(m => m.Description)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(m => m.ReleaseDate)
            .IsRequired();

        builder.Property(m => m.Language)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(m => m.Genre)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(m => m.Rating)
            .HasColumnType("decimal(3,2)")
            .IsRequired();

        builder.Property(m => m.NumberOfRatings)
            .IsRequired();

        builder.HasMany(m => m.StaffMembers)
            .WithMany(a => a.TvShows)
            .UsingEntity(j => j.ToTable("TvShowStaffMembers"));

        builder.HasMany(m => m.Actors)
            .WithMany(a => a.TvShows)
            .UsingEntity(j => j.ToTable("TvShowActors"));

        builder.HasMany(e => e.FavouriteUsers)
            .WithMany(u => u.FavoriteTvShows)
            .UsingEntity(j => j.ToTable("UserTvShows"));

        builder.HasMany(e => e.Seasons)
            .WithOne(s => s.TvShow)
            .HasForeignKey(e => e.TvShowId)
            .HasPrincipalKey(e => e.Id)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}