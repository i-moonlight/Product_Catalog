using Microsoft.EntityFrameworkCore;
using ProductCatalog.Entities;

namespace ProductCatalog;

public class ProductCatalogDbContext: DbContext
{
    public ProductCatalogDbContext(DbContextOptions<ProductCatalogDbContext> options) : base(options)
    {}
    
    public DbSet<Product>? Products { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProductCatalogDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}