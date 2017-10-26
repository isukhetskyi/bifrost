using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Bifrost.Repository
{
    public class EntityFrameworkRepository<TContext> : EntityFrameworkReadOnlyRepository<TContext>, IRepository
        where TContext : DbContext
    {
        public void Create<TEntity>(TEntity entity, string createdBy = null) where TEntity : class
        {
            throw new System.NotImplementedException();
        }

        public void Delete<TEntity>(object id) where TEntity : class
        {
            throw new System.NotImplementedException();
        }

        public void Delete<TEntity>(TEntity entity) where TEntity : class
        {
            throw new System.NotImplementedException();
        }

        public void Save()
        {
            throw new System.NotImplementedException();
        }

        public Task SaveAsync()
        {
            throw new System.NotImplementedException();
        }

        public void Update<TEntity>(TEntity entity, string modifiedBy = null) where TEntity : class
        {
            throw new System.NotImplementedException();
        }
    }
}