using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class ProductConfiguration: IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.Property(p => p.Price)
            .HasColumnType("decimal(18,2)");
        
        builder.HasMany(p => p.Comments)
            .WithOne(c => c.Product)
            .HasForeignKey(c => c.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasMany(p => p.LineItems)
            .WithOne(li => li.Product)
            .HasForeignKey(li => li.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.Property(p => p.Price).IsRequired();
        builder.Property(p => p.QuantityInStock).IsRequired();
        builder.Property(p => p.Type).IsRequired();
        builder.Property(p => p.Name).IsRequired();
        builder.Property(p => p.Description).IsRequired();
        builder.Property(p => p.CreatedAt).IsRequired();
        builder.Property(p => p.UpdatedAt).IsRequired();
    }
}