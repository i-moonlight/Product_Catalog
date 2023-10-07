using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace ProductCatalog;

public static class DependencyInjection
{
    public static IServiceCollection ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration)
    {
        
        services.AddDbContext<ProductCatalogDbContext>(
            options => options.UseNpgsql(
                GetConnectionString(configuration)
            ));
        
        return services;
    }
    
    private static string GetConnectionString(IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
        return string.IsNullOrEmpty(databaseUrl) 
            ? connectionString! 
            : BuildConnectionStringFromUrl(databaseUrl);
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