using KotiCRM.Repository.Data;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class PermissionRepository : IPermissionRepository
    {
        private readonly KotiCRMDbContext _context;

        public PermissionRepository(KotiCRMDbContext context)
        {
            _context = context;
        }

        public async Task<List<Permissions>> GetPermissionsAsync()
        {
            return await _context.Permissions.ToListAsync();
        }

        public async Task<List<Module>> GetModulesAsync()
        {
            return await _context.Modules.ToListAsync();
        }
    }
}
