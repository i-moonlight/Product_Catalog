using System.Linq.Expressions;
using ProductCatalog.Entities;
namespace Domain.Repository;

public interface IProductRepository : IGenericRepository<Product>
{

     ValueTask<Product?> GetProductById(int id);
     Task<List<Product>> GetAllProducts(int pageIndex, int pageSize);
     List<Product> GetProductsByName(string name);
     Task<bool> CheckNameExistence(string name);
     List<Product> GetProductsByCategory(string type);
     List<Product> FindProducts(Expression<Func<Product,bool>> predicate);
     void AddProduct(Product product);
     void AddProducts(IEnumerable<Product> products);
     void RemoveProduct(Product product);
     void RemoveProducts(IEnumerable<Product> products);

}