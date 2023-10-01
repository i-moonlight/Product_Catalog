using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    private const int PageSize = 9;
    
    public ProductController(
        ProductCatalogDbContext context, 
        ILogger<ProductController> logger)
    {
        _context = context;
        _logger = logger;
    }
    
    [HttpGet]
    public async Task<IActionResult> Get(int pageIndex)
    {
        var total = await _context.Products.CountAsync();
        var totalPages = (int)Math.Ceiling(total / (double)PageSize);
        HttpContext.Response.Headers.Add("totalPages",totalPages.ToString());
        
        var products = await _context.Products
            .OrderBy(p => p.CreatedAt)
            .Skip((pageIndex - 1) * PageSize)
            .Take(PageSize)
            .ToListAsync();
        
        _logger.LogInformation("Produtos retornados com sucesso.");
        return Ok(products);
    }
    
    [HttpPost]
    public IActionResult Post(ProductModel productModel)
    {
        if (_context.Products
                .Any(p => p.Name.ToLower().Trim() == productModel.Name.ToLower().Trim()))
        {
            _logger.LogError("O produto já existe.");
            return BadRequest("O produto já existe.");
        }
        
        var product = new Product()
        {
            Name = productModel.Name,
            Quantity = productModel.Quantity,
            Type = Enum.Parse<ProductTypeEnum>(productModel.Type),
            Price = productModel.Price,
            Description = productModel.Description,
            ImageRef = productModel.ImageRef,
            CreatedAt = DateTimeOffset.Now
        };
        
        _context.Products.Add(product);
        _context.SaveChanges();
        _logger.LogInformation("Produto criado com sucesso.");
        return CreatedAtAction(nameof(Get), new { id = product.Id }, productModel);
    }
}