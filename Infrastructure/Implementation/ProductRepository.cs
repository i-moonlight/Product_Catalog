using System.Linq.Expressions;
using Domain.Entities;
using Domain.Repository;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementation;

public sealed class ProductRepository : GenericRepository<Product>, IProductRepository
{
    private readonly ProductCatalogDbContext _context;

    public ProductRepository(ProductCatalogDbContext context) : base(context)
    {
        _context = context;
    }


    public ValueTask<Product?> GetProductById(int id)
    {
        return GetByIdAsync(id).Result;
    }

    public Task<List<Product>> GetAllPaginatedProducts(int pageIndex, int pageSize)
    {
        return GetAllAsync()
            .OrderBy(p => p.CreatedAt)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }
    
    public Task<List<Product>> GetAllProducts()
    {
        return GetAllAsync()
            .ToListAsync();

    }

    public List<Product> GetProductsByName(string name)
    {
            return _context.Products!
                .AsNoTracking()
                .Where(p => p.Name.ToLower().Trim().Contains(name.ToLower().Trim()))
                .ToListAsync().Result;
    }

    public Task<bool> CheckNameExistence(string name)
    {
        return Task.FromResult(_context.Products!
            .AnyAsync(p => p.Name.ToLower().Trim() == name.ToLower().Trim()).Result);
    }

    public List<Product> GetProductsByCategory(string type)
    {
        return _context.Products!
            .AsNoTracking()
            .Where(p => p.Type.Equals(type))
            .ToListAsync().Result;
    }

    public List<Product> FindProducts(Expression<Func<Product, bool>> predicate)
    {
        return FindAsync(predicate).Result;
    }

    public void AddProduct(Product product)
    {
        AddAsync(product);
    }

    public void AddProducts(IEnumerable<Product> products)
    {
        AddRangeAsync(products);
    }

    public void RemoveProduct(Product product)
    {
        Remove(product);
    }

    public void RemoveProducts(IEnumerable<Product> products)
    {
        RemoveRange(products);
    }
}