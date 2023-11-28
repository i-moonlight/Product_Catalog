using Domain.Enums;

namespace Domain.Entities;

public class Order: BaseEntity
{
    public List<LineItem> LineItems { get; set; } = new();
    public double Total { get; set; }
    public DateTimeOffset DeliveryDate { get; set; }
    public double DeliveryFee { get; set; }
    public OrderStatusEnum Status { get; set; }
}
