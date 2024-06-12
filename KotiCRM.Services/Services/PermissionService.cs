using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Services.Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.Services
{
    public class PermissionService: IPermissionService
    {
        private readonly IPermissionRepository _permissionRepository;

        public PermissionService(IPermissionRepository permissionRepository)
        {
            _permissionRepository = permissionRepository;
        }

        public async Task<List<Permissions>> GetPermissionsAsync()
        {
            return await _permissionRepository.GetPermissionsAsync();
        }

        public async Task<List<Module>> GetModulesAsync()
        {
            return await _permissionRepository.GetModulesAsync();
        }

    }
}
