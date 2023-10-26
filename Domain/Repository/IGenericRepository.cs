using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Domain.Repository;

public interface IGenericRepository<T> where T : class
{
    Task<ValueTask<T?>> GetByIdAsync(int id);
    IQueryable<T> GetAllAsync();
    Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate);
    void AddAsync(T entity);
    void AddRangeAsync(IEnumerable<T> entities);
    void Remove(T entity);
    void RemoveRange(IEnumerable<T> entities);
    void SaveChangesAsync();
}