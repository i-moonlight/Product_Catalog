using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class CommentConfiguration
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {

        builder.HasKey(c => c.Id);
        
        builder.Property(c => c.Content).IsRequired();

        
        builder.HasOne(c => c.Product)
            .WithMany(p => p.Comments)
            .HasForeignKey(c => c.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}