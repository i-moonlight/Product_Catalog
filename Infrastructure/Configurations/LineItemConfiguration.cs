using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class LineItemConfiguration: IEntityTypeConfiguration<LineItem>
{
    public void Configure(EntityTypeBuilder<LineItem> builder)
    {
        builder.HasKey(op => new { op.ProductId, op.OrderId });
        
        builder.Property(op => op.Price)
            .HasColumnType("decimal(18,2)");
        
        builder.Property(op => op.Total)
            .HasColumnType("decimal(18,2)");

        builder.HasOne(op => op.Product)
            .WithMany(p => p.LineItems)
            .HasForeignKey(op => op.ProductId)
            .OnDelete(DeleteBehavior.Cascade);


        builder.HasOne(op => op.Order)
            .WithMany(o => o.LineItems)
            .HasForeignKey(op => op.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
