using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context;

public class ProductCatalogDbContext: DbContext
{
    public ProductCatalogDbContext(DbContextOptions<ProductCatalogDbContext> options) : base(options)
    {}
    
    public DbSet<Product>? Products { get; set; }
    public DbSet<Order>? Orders { get; set; }

    public DbSet<LineItem>? LineItems { get; set; }
    public DbSet<Comment>? Comments { get; set; }

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProductCatalogDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}