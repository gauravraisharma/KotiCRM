using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Owner Id Is required")]
        public int OwnerId { get; set; }
        [Column(TypeName = "nvarchar(450)")]
        public string FirstName { get; set; }
        [Column(TypeName = "nvarchar(450)")]
        public string LastName { get; set; }

        [ForeignKey("Account")]
        [Required(ErrorMessage = "Account ID Is required")]
        public int AccountID { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [StringLength(20)]
        public string Phone { get; set; }
        [StringLength(20)]
        public string OtherPhone { get; set; }
        [StringLength(20)]
        public string Mobile { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string Title { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string Department { get; set; }
        public DateTime? DateOfBirth { get; set; }
        [StringLength(20)]
        public string HomePhone { get; set; }
        [Required(ErrorMessage = "Skype Id Is required")]
        public string SkypeID { get; set; }
        
        public string LinkedinURL { get; set; }
        public string TwitterURL { get; set; }
        [EmailAddress]
        public string SecondaryEmail { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string MailingStreet { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string City { get; set; }
        [Column(TypeName = "nvarchar(100)")]

        public string State { get; set; }
        [Column(TypeName = "nvarchar(100)")]

        public string Zip { get; set; }
        [Column(TypeName = "nvarchar(100)")]

        public string Country { get; set; }
        [Column(TypeName = "nvarchar(450)")]
        public string Description { get; set; }
    }
}
