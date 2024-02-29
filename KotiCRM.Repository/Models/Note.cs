using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class Note
    {
        [Key]
        public int ID { get; set; }
        [ForeignKey("Account")]
        [Required]
        public int AccountID { get; set; }
        [Required]
        public int UserID { get; set; }
        public DateTime DateOfNote { get; set; }
        [Column(TypeName = "nvarchar(450)")]
        public string Description { get; set; }
    }
}
