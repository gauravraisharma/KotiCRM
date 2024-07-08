using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.IRepository
{
    public interface IPermissionRepository
    {
        Task<List<Permissions>> GetPermissionsAsync();
        Task<List<Module>> GetModulesAsync();
    }
}
