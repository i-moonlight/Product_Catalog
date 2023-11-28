using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class OrderConfiguration: IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.Property(o => o.Total)
            .HasColumnType("decimal(18,2)");
        
        builder.Property(o => o.Total).IsRequired();
        builder.Property(o => o.DeliveryFee).IsRequired();
        builder.Property(o => o.Status).IsRequired();


        builder.HasMany(o => o.LineItems)
            .WithOne(li => li.Order)
            .HasForeignKey(li => li.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}