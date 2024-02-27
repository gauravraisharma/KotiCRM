using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class RoleModulePermission
    {
        public int Id { get; set; }
        public int RollId { get; set; }
        public int ModuleId { get; set; }
        public int PermissionId { get; set; }
        public bool Isactive { get; set; }
        public bool Isdelete { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}
