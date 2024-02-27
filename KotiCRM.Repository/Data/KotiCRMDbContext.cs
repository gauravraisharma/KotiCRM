using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Data
{
    public class KotiCRMDbContext : IdentityDbContext<ApplicationUser>
    {
        public KotiCRMDbContext(DbContextOptions<KotiCRMDbContext> options)
            : base(options)
        {
        }
        //public DbSet<ApplicationUser> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
