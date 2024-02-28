using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class Permissions
    {
        [Key]
        public int PermissionId {  get; set; }
        public int ModuleID {  get; set; }
        public string RoleID {  get; set; }
        public bool Add {  get; set; }
        public bool Edit { get; set; }
        public bool View { get; set; }
        public bool Delete { get; set; }

      

    }
}
