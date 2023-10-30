using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductCatalog.Models;

public class ProductModel
{
    public required string Name { get; set; }
    [Required]
    public int QuantityInStock { get; set; }
    [Required]
    public string Type { get; set; } = null!;
    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    [Required]
    public required string Description { get; set; }
    public string? ImageRef { get; set; }
}