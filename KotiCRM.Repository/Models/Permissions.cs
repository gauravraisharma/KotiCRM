using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class Permissions
    {
        public int PermissionId {  get; set; }
        public string Name {  get; set; }
        public string Type {  get; set; }
        public bool Isactive {  get; set; }
        public bool Isdelete { get; set; }

        public string CreatedBy {  get; set; }
        public DateTime CreatedOn {  get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn {  get; set; }

    }
}
