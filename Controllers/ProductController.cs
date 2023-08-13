using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Entities;
using ProductCatalog.Enums;
using ProductCatalog.Models;

namespace ProductCatalog.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class ProductController : ControllerBase
{
    private readonly ProductCatalogDbContext _context;
    private readonly ILogger<ProductController> _logger;
    
    public ProductController(
        ProductCatalogDbContext context, 
        ILogger<ProductController> logger)
    {
        _context = context;
        _logger = logger;
    }
    
    [HttpGet]
    public IActionResult Get()
    {
        var products = _context.Products.ToList();
        return Ok(products);
    }
    
    [HttpPost]
    public IActionResult Post(ProductModel productModel)
    {

        if (_context.Products
                .Any(p => p.Name.ToLower().Trim() == productModel.Name.ToLower().Trim()))
        {
            _logger.LogError("Product already exists");
            return BadRequest("Product already exists");
        }
        
        var product = new Product()
        {
            Name = productModel.Name,
            Quantity = productModel.Quantity,
            Type = Enum.Parse<ProductTypeEnum>(productModel.Type),
            Price = productModel.Price,
            Description = productModel.Description,
            CreatedAt = DateTimeOffset.Now
        };
        
        _context.Products.Add(product);
        _context.SaveChanges();
        _logger.LogInformation("Product created successfully");
        return CreatedAtAction(nameof(Get), new { id = product.Id }, productModel);
    }
}