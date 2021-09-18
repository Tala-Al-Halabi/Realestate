using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Property> Properties { get; set; }
        public DbSet<PropertyInvestor> PropertyInvestors { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<PropertyInvestor>(x => x.HasKey(aa => new {aa.AppUserId, aa.PropertyId}));

            builder.Entity<PropertyInvestor>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Properties)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<PropertyInvestor>()
                .HasOne(u => u.Property)
                .WithMany(a => a.Investors)
                .HasForeignKey(aa => aa.PropertyId);
        }
    }
}