using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Repository;

public interface IProductRepository : IGenericRepository<Product>
{

     ValueTask<Product?> GetProductById(int id);
     Task<List<Product>> GetAllPaginatedProducts(int pageIndex, int pageSize);
     public Task<List<Product>> GetAllProducts();
     List<Product> GetProductsByName(string name);
     List<Product> GetProductsByFilterName(string filterName, int pageSize, int pageIndex);
     Task<bool> CheckNameExistence(string name);
     List<Product> GetProductsByCategory(string type);
     List<Product> FindProducts(Expression<Func<Product,bool>> predicate);
     void AddProduct(Product product);
     void AddProducts(IEnumerable<Product> products);
     void RemoveProduct(Product product);
     void RemoveProducts(IEnumerable<Product> products);

}