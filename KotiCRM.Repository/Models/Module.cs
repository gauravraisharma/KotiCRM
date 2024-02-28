using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class Module
    {
        [Key]
        public int Id {  get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Name {  get; set; }
        public bool Isactive { get; set; }
        public bool Isdelete { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }

    }
}
