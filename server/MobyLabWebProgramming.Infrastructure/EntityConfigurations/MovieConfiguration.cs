using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

/// <summary>
/// This is the entity configuration for the User entity, generally the Entity Framework will figure out most of the configuration but,
/// for some specifics such as unique keys, indexes and foreign keys it is better to explicitly specify them.
/// Note that the EntityTypeBuilder implements a Fluent interface, meaning it is a highly declarative interface using method-chaining.
/// </summary>
public class MovieConfiguration : IEntityTypeConfiguration<Movie>
{
    public void Configure(EntityTypeBuilder<Movie> builder)
    {
        builder.Property(m => m.Name)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(m => m.Description)
            .HasMaxLength(1000)
            .IsRequired();

        builder.Property(m => m.ReleaseDate)
            .IsRequired();

        builder.Property(m => m.Duration)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(m => m.Language)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(m => m.Genre)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(m => m.ImageUrl)
        .HasMaxLength(255)
        .IsRequired();

        builder.Property(m => m.Rating)
            .HasColumnType("decimal(3,2)")
            .IsRequired();

        builder.Property(m => m.NumberOfRatings)
            .IsRequired();

        builder.HasMany(m => m.StaffMembers)
            .WithMany(a => a.Movies)
            .UsingEntity(j => j.ToTable("MovieStaffMembers"));

        builder.HasMany(m => m.Actors)
            .WithMany(a => a.Movies)
            .UsingEntity(j => j.ToTable("MovieActors"));

        builder.HasMany(e => e.FavouriteUsers)
            .WithMany(u => u.FavoriteMovies)
            .UsingEntity(j => j.ToTable("UserMovies"));
    }
}
