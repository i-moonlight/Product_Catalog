using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain.Entities;

public class Product: BaseEntity
{
    public List<Comment> Comments { get; set; } = new List<Comment>();
    public List<LineItem> LineItems { get; set; } = new List<LineItem>();
    
    [MinLength(3)]
    public string Name { get; set; } = null!;
    [Range(1,1000)]
    public int QuantityInStock { get; set; }
    public ProductTypeEnum Type { get; set; }
    [Range(1,100000)]
    public decimal Price { get; set; }
    [MinLength(25)]
    public string Description { get; set; } = null!;
    public string? ImageRef { get; set; }
}