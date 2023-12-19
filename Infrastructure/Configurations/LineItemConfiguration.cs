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
        
        builder.Property(li => li.Price).IsRequired();
        builder.Property(li => li.Type).IsRequired();
        builder.Property(li => li.Name).IsRequired();
        builder.Property(li => li.Description).IsRequired();
        builder.Property(li => li.Quantity).IsRequired();
        builder.Property(li => li.CreatedAt).IsRequired();
        builder.Property(li => li.UpdatedAt).IsRequired();
        
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