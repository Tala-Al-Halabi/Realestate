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
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<PropertyInvestor>(x => x.HasKey(aa => new { aa.AppUserId, aa.PropertyId }));

            builder.Entity<PropertyInvestor>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Properties)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<PropertyInvestor>()
                .HasOne(u => u.Property)
                .WithMany(a => a.Investors)
                .HasForeignKey(aa => aa.PropertyId);

            builder.Entity<Comment>()
                .HasOne(a => a.Property)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });

                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(o => o.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(o => o.TargetId)
                    .OnDelete(DeleteBehavior.Cascade);

            });
        }
    }
}