using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class ProductConfiguration: IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.Property(li => li.Price)
            .HasColumnType("decimal(18,2)");
        
        builder.Property(o => o.Price).IsRequired();
        builder.Property(o => o.QuantityInStock).IsRequired();
        builder.Property(o => o.Type).IsRequired();
        builder.Property(o => o.Name).IsRequired();
        builder.Property(o => o.Description).IsRequired();
        builder.Property(o => o.CreatedAt).IsRequired();
        builder.Property(o => o.UpdatedAt).IsRequired();
    }
}