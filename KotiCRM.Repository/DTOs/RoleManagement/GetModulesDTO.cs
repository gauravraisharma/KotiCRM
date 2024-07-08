using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.RoleManagement
{
    public class GetModulesDTO
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Name { get; set; }
    }
}
