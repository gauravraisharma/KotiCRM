using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace KotiCRM.Repository.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "nvarchar(450)")]
        public string FirstName { get; set; }
        [Column(TypeName = "nvarchar(450)")]
        public string? LastName { get; set; }

        [Column(TypeName = "nvarchar(450)")]
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        [Column(TypeName = "nvarchar(450)")]
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public int OrganizationId { get; set; }
    }
}

