using System.ComponentModel.DataAnnotations.Schema;
using ProductCatalog.Enums;

namespace ProductCatalog.Entities;

public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Quantity { get; set; }
    public ProductTypeEnum Type { get; set; }
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    public required string Description { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}