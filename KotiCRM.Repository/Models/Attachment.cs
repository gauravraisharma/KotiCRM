using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class Attachment
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int UserID { get; set; }
        public DateTime DateAdded { get; set; }
        [Column(TypeName = "float")]
        public double SizeMb { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string FileName { get; set; }
    }
}
