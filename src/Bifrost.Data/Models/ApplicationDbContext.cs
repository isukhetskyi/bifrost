using Microsoft.EntityFrameworkCore;

namespace Bifrost.Data.Models
{
    public class ApplicationDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<Respondent> Respondents {get;set;}
        public DbSet<Technology> Technologies {get;set;}
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<RespondentTechnology>()
                .HasKey(t => new { t.RespondentId, t.TechnologyId });

            builder.Entity<RespondentTechnology>()
                .HasOne(rt => rt.Respondent)
                .WithMany(p => p.RespondentsTechnologies)
                .HasForeignKey(rt => rt.RespondentId);

            builder.Entity<RespondentTechnology>()
                .HasOne(rt => rt.Technology)
                .WithMany(t => t.RespondentsTechnologies)
                .HasForeignKey(rt => rt.TechnologyId);
            base.OnModelCreating(builder);
        }
    }
}