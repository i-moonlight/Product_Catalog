using System.Collections.ObjectModel;
using FakerOfData;
using Microsoft.VisualBasic;
using ProductCatalog.Entities;
using ProductCatalog.Enums;

namespace ProductCatalog;

public static class Seeder
{
    private static readonly List<string> ImageRefs = new()
    {
      "https://images.pexels.com/photos/8361545/pexels-photo-8361545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/8365688/pexels-photo-8365688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7500307/pexels-photo-7500307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/8054395/pexels-photo-8054395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/",
      "https://images.pexels.com/photos/8361516/pexels-photo-8361516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/9748637/pexels-photo-9748637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/8130248/pexels-photo-8130248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4841476/pexels-photo-4841476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/12602355/pexels-photo-12602355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6832474/pexels-photo-6832474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3868558/pexels-photo-3868558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/9002411/pexels-photo-9002411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/8872284/pexels-photo-8872284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/11030247/pexels-photo-11030247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7053470/pexels-photo-7053470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/8714291/pexels-photo-8714291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/12616229/pexels-photo-12616229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/8082383/pexels-photo-8082383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/9323886/pexels-photo-9323886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/755992/pexels-photo-755992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4110349/pexels-photo-4110349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/9323864/pexels-photo-9323864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/14490688/pexels-photo-14490688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/8793476/pexels-photo-8793476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/11783021/pexels-photo-11783021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/264870/pexels-photo-264870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/13964074/pexels-photo-13964074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/15574229/pexels-photo-15574229/free-photo-of-a-perfume-bottle-with-an-empty-label.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/14311564/pexels-photo-14311564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3640668/pexels-photo-3640668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/672051/pexels-photo-672051.jpeg",
      "https://images.pexels.com/photos/15569139/pexels-photo-15569139/free-photo-of-bottle-with-a-cosmetic-product-on-red-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/12455683/pexels-photo-12455683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7796408/pexels-photo-7796408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6223482/pexels-photo-6223482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    };


    public static void Initialize(ProductCatalogDbContext context)
    {
        if (context.Products.Any()) return;
        var rand = new Random();
        
        var products = Enumerable.Range(1, 36)
            .Select(index => new Product
            {
                Name = "Produto" + rand.Next(1, 1000) ,
                Description = Lorem.Ipsum(7, true),
                CreatedAt = rand.Date(DateTimeOffset.Now),
                Price =  new decimal(rand.Next(10, 250)),
                Quantity = rand.Next(1, 100),
                Type = Enumerable.Range(0,2)
                    .Select(x => (ProductTypeEnum)x)
                    .OrderBy(x => Guid.NewGuid())
                    .FirstOrDefault(),
                ImageRef = ImageRefs[rand.Next(0, ImageRefs.Count - 1)]
            })
            .ToList();
        
        context.Products.AddRange(products);
        context.SaveChanges();
    }
}
