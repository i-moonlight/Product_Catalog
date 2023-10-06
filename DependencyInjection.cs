using Microsoft.EntityFrameworkCore;

namespace ProductCatalog;

public static class DependencyInjection
{
    public static IServiceCollection ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration)
    {
        
        services.AddDbContext<ProductCatalogDbContext>(
            options => options.UseNpgsql(
                IsPlatformRailwayOrLocal(configuration).Result
            ));
        
        return services;
    }

    private static Task<string> IsPlatformRailwayOrLocal(IConfiguration configuration)
    {
        var portVar = Environment.GetEnvironmentVariable("PORT");
        
        if (string.IsNullOrEmpty(portVar))
        {
            var onLocally = configuration
                .GetConnectionString("ProductCatalogConnection");
            return Task.FromResult(onLocally!);
        }
        var onRailway = configuration
            .GetConnectionString("ProductCatalogConnectionOnRailway");
    
        return Task.FromResult(onRailway!);
    }
    
}