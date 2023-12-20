using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context.Abstraction;

public interface IProductCatalogDbContext
{
    DbSet<T> Set<T>() where T : class;
}