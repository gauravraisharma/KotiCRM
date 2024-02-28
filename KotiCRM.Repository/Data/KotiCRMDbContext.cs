using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Data
{
    public class KotiCRMDbContext : IdentityDbContext<ApplicationUser,ApplicationRole,string>
    {
        public KotiCRMDbContext(DbContextOptions<KotiCRMDbContext> options): base(options)
        {
        }
        public DbSet<Permissions> Permissions { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Industry> Industry { get; set; }

       
    }
}
