using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.RoleManagement
{
    public class UpdateModulePermissionDTO
    {
        public int PermissionId { get; set; }
        public bool IsEdit { get; set; }
        public bool IsView { get; set; }
        public bool IsAdd { get; set; }
        public bool IsDelete { get; set; }
        public int ModuleId { get; set; }
        public string? RoleId { get; set; }
    }
}
