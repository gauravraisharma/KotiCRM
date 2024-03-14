using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace KotiCRM.Repository.DTOs.Organization
{
    public class OrganizationDTO
    {
        [Key]
        public int Id { get; set; }

        public string? OrgName { get; set; }

        public bool? IsActive { get; set; }

        public string? TimeZone { get; set; }

        public bool? Shifts { get; set; }

        public bool? IncludeLogofToIdle { get; set; }

        public string? Currency { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string? BillingStreet { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string? BillingCity { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string? BillingState { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string? BillingCode { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string? BillingCountry { get; set; }
    }
}