using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string RollName { get; set; }
        public bool IsDefault { get; set; }
        public bool Isactive { get; set; }
        public bool Isdelete { get; set; }

        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }

    }
}
