using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class LineItemConfiguration: IEntityTypeConfiguration<LineItem>
{
    public void Configure(EntityTypeBuilder<LineItem> builder)
    {
        builder.Property(li => li.Price)
            .HasColumnType("decimal(18,2)");
        
        builder.Property(o => o.Price).IsRequired();
        builder.Property(o => o.QuantityInStock).IsRequired();
        builder.Property(o => o.Type).IsRequired();
        builder.Property(o => o.Name).IsRequired();
        builder.Property(o => o.Description).IsRequired();
        builder.Property(o => o.Quantity).IsRequired();
        builder.Property(o => o.CreatedAt).IsRequired();
        builder.Property(o => o.UpdatedAt).IsRequired();
        
        builder.HasOne(li => li.Product)
            .WithMany(p => p.LineItems)
            .HasForeignKey(li => li.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(li => li.Order)
            .WithMany(o => o.LineItems)
            .HasForeignKey(li => li.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

    }
}