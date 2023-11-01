using Domain.Entities;
using Domain.Enums;
using Domain.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductCatalog.Models;

namespace ProductCatalog.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly IProductRepository _productRepository;
    private const int PageSize = 9;
    
    public ProductController(
        ILogger<ProductController> logger,
        IProductRepository productRepository)
    { 
        _logger = logger;
        _productRepository = productRepository;
    }
    
    [HttpGet]
    public Task<IActionResult> Get(int pageIndex)
    {
        var totalCount = _productRepository.GetAllProducts().Result.Count;
        var totalPages = (int)Math.Ceiling(totalCount / (double)PageSize);
        HttpContext.Response.Headers.Add("totalPages",totalPages.ToString());
        HttpContext.Response.Headers.Add("totalCount",totalCount.ToString());



        var paginatedList =  _productRepository
            .GetAllPaginatedProducts(pageIndex,PageSize);
        
        _logger.LogInformation("Produtos retornados com sucesso.");
        return Task.FromResult<IActionResult>(Ok(paginatedList.Result));
    }

    [HttpGet("byName")]
    public Task<IActionResult> GetByName()
    {
        //check if there is a querystring named 'productName'
        var productNameExists = Request.Query.TryGetValue("productName", out var productName);

        if (!productNameExists)
        {
            return Task.FromResult<IActionResult>(BadRequest("Digite um valor válido para realizar a filtragem."));
        }
        var filteredProductsByName = _productRepository
            .GetProductsByName(productName.ToString());
                
        _logger.LogInformation("Produtos filtrados por nome.");
        return Task.FromResult<IActionResult>(Ok(filteredProductsByName));
    }
    
    [HttpPost]
    public IActionResult Post(ProductModel productModel)
    {
        if (_productRepository.CheckNameExistence(productModel.Name).Result)
        {
            _logger.LogError("O produto já existe.");
            return BadRequest($"O produto '{productModel.Name}' já existe, por favor digite um nome válido.");

        }
        
        var product = new Product()
        {
            Name = productModel.Name,
            QuantityInStock = productModel.QuantityInStock,
            Type = Enum.Parse<ProductTypeEnum>(productModel.Type),
            Price = productModel.Price,
            Description = productModel.Description,
            ImageRef = productModel.ImageRef,
            CreatedAt = DateTimeOffset.Now.ToUniversalTime()
        };
        
        _productRepository.AddAsync(product);
        _logger.LogInformation("Produto criado com sucesso.");
        return CreatedAtAction(nameof(Get), new { id = product.Id }, productModel);
    }

}