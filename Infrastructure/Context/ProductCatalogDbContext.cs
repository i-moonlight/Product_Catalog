using Domain.Entities;
using Infrastructure.Context.Abstraction;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context;

public class ProductCatalogDbContext: DbContext, IProductCatalogDbContext
{
    public ProductCatalogDbContext(DbContextOptions<ProductCatalogDbContext> options) : base(options)
    {}
    
    public DbSet<Role>? Roles { get; set; }
    public DbSet<User>? Users { get; set; }
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