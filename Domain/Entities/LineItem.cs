using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain.Entities;

public class LineItem: BaseEntity
{
    public int OrderId { get; init; }
    public Order Order { get; init; } = null!;
    public int ProductId { get; init; }
    public Product Product { get; init; } = null!;
    public int Quantity { get; init; }
    public Decimal Price { get; init; }
    public string? ImageRef { get; init; }
    [MinLength(3)]
    public string Name { get; set; } = null!;
    public int QuantityInStock { get; set; }
    public ProductTypeEnum Type { get; set; }
    [MinLength(25)]
    public string Description { get; set; } = null!;
    
}