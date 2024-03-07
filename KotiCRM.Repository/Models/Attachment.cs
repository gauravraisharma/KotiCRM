using Microsoft.AspNetCore.Http;
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
        [Required(ErrorMessage = "User Id Is required")]
        public string UserID { get; set; }
        public DateTime DateAdded { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string SizeMb { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string FileName { get; set; }
        [NotMapped]
        public IFormFile? file { get; set; }

    }
}
