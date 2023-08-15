using FakerOfData;
using ProductCatalog.Entities;
using ProductCatalog.Enums;

namespace ProductCatalog;

public static class Seeder
{
    public static void Initialize(ProductCatalogDbContext context)
    {
        if (context.Products.Any()) return;
        var rand = new Random();
        
        var products = Enumerable.Range(1, 15)
            .Select(index => new Product
            {
                Name = Lorem.Ipsum(1),
                Description = Lorem.Ipsum(10, true),
                CreatedAt = rand.Date(DateTimeOffset.Now),
                Price =  new decimal(rand.Next(10, 250)),
                Quantity = rand.Next(1, 100),
                Type = Enumerable.Range(0,2)
                    .Select(x => (ProductTypeEnum)x)
                    .OrderBy(x => Guid.NewGuid())
                    .FirstOrDefault()
            })
            .ToList();
        
        context.Products.AddRange(products);
        context.SaveChanges();
    }
}