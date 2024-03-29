using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class ActorConfiguration : IEntityTypeConfiguration<Actor>
{
    public void Configure(EntityTypeBuilder<Actor> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(e => e.Id);
        builder.Property(e => e.FirstName)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.LastName)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Birthdate)
            .IsRequired();
        builder.Property(e => e.Gender)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.PhotoUrl)
            .HasMaxLength(255)
            .IsRequired();
    }
}