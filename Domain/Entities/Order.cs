using System.ComponentModel.DataAnnotations.Schema;
using Domain.Enums;

namespace Domain.Entities;

public class Order: BaseEntity
{
    public Order()
    {
        
    }
    
    public User User { get; set; }
    public int UserId { get; set; }
    public List<LineItem> LineItems { get; set; } = new();
    public double Total { get; set; }
    public DateTimeOffset DeliveryDate { get; set; }
    public decimal DeliveryFee { get; set; }
    public OrderStatusEnum Status { get; set; }
}
