using Domain.Repository;
using Infrastructure.Context;
using Infrastructure.Implementation;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace ProductCatalog;

public static class DependencyInjection
{
    public static IServiceCollection ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<ProductCatalogDbContext>();
        services.AddScoped<IProductRepository,ProductRepository>();
        
        services.AddDbContext<ProductCatalogDbContext>(
            options => options.UseNpgsql(
                GetConnectionString(configuration)
            ));
        
        return services;
    }
    
    private static string GetConnectionString(IConfiguration configuration)
    {
        var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

        var connectionString = string.IsNullOrEmpty(databaseUrl) ? 
            configuration.GetConnectionString("DefaultConnection")! : 
            BuildConnectionStringFromUrl(databaseUrl);

        return connectionString;
    }
        
    private static string BuildConnectionStringFromUrl(string databaseUrl)
    {
        var databaseUri = new Uri(databaseUrl);
        var userInfo = databaseUri.UserInfo.Split(":");
        var builder = new NpgsqlConnectionStringBuilder()
        {
            Host = databaseUri.Host,
            Port = databaseUri.Port,
            Username = userInfo[0],
            Password = userInfo[1],
            Database = databaseUri.LocalPath.TrimStart('/'),
            SslMode = SslMode.Require,
            TrustServerCertificate = true
        };
        return builder.ToString();
    }
    
}