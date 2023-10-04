using Microsoft.EntityFrameworkCore;

namespace ProductCatalog;

public static class DependencyInjection
{
    public static IServiceCollection ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ProductCatalogDbContext>(
            options => options.UseNpgsql(
                configuration.GetConnectionString("ProductCatalogConnectionOnRailway")!));

        return services;
    }
}