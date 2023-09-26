using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ProductCatalog.Enums;

namespace ProductCatalog.Entities;

public class Product
{
    public int Id { get; set; }
    [Required]
    [MinLength(3)]
    public required string Name { get; set; }
    [Required]
    [Range(1,1000)]
    public int Quantity { get; set; }
    public ProductTypeEnum Type { get; set; }
    [Required]
    [Column(TypeName = "decimal(18,2)")]
    [Range(1,100000)]
    public decimal Price { get; set; }
    [Required]
    [MinLength(25)]
    public required string Description { get; set; }
    [Required]
    public DateTimeOffset CreatedAt { get; set; }
    public string ImageRef { get; set; } = null!;
}