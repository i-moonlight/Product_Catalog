using Microsoft.AspNetCore.Mvc;

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
}