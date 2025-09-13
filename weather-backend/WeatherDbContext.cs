using Microsoft.EntityFrameworkCore;
using System;
using weather_app.Models;

namespace weather_app
{
    public class WeatherDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public WeatherDbContext(DbContextOptions<WeatherDbContext> options)
        : base(options) { }

        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>();
        }
    }
}
