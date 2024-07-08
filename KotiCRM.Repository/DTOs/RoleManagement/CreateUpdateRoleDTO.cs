using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.RoleManagement
{
    public class CreateUpdateRoleDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool Isactive { get; set; }
    }
}
