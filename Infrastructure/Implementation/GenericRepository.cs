using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;
using ProductCatalog;
using ProductCatalog.Entities;

namespace Infrastructure.Implementation;

public class GenericRepository<T> : IGenericRepository<T> where T: class
{
    private readonly ProductCatalogDbContext _context;

    protected GenericRepository(ProductCatalogDbContext context)
    {
        _context = context;
    }
    
    public async Task<ValueTask<T?>> GetByIdAsync(int id)
    {
        return await Task
                .FromResult(
                    _context.Set<T>()
                    .FindAsync(id)
                    );
    }

    public async Task<List<T>> GetAllAsync()
    {
        return await _context
                .Set<T>()
                .AsNoTracking()
                .ToListAsync();
    }

    public async Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await _context.Set<T>()
                .Where(predicate)
                .ToListAsync();
    }

    public async void AddAsync(T entity)
    {
        await _context
                .Set<T>().AddAsync(entity);
        
        SaveChangesAsync();
    }

    public async void AddRangeAsync(IEnumerable<T> entities)
    {
        await _context
                .Set<T>().AddRangeAsync(entities);
        
        SaveChangesAsync();
    }

    public void Remove(T entity)
    {
        _context.Set<T>().Remove(entity);
        
        SaveChangesAsync();
    }

    public void RemoveRange(IEnumerable<T> entities)
    {
        _context.Set<T>().RemoveRange(entities);
        
        SaveChangesAsync();
    }

    public async void SaveChangesAsync()
    {
         await _context.SaveChangesAsync();
    }
    
}