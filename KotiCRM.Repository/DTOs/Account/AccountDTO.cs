using KotiCRM.Repository.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.Account
{
    public class AccountDTO
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string OwnerId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string AccountName { get; set; }

        [ForeignKey("Industry")]
        [Required]
        public string Industry { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string AnnualRevenue { get; set; }
        public AccountStatus Status { get; set; }
        [StringLength(20)]
        public string Phone { get; set; }
        [StringLength(20)]
        public string Fax { get; set; }
        [Column(TypeName = "nvarchar(450)")]
        public string WebSite { get; set; }
        public AccountType Type { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string BillingStreet { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string BillingCity { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string BillingState { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string BillingCode { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string Country { get; set; }
        [Column(TypeName = "nvarchar(450)")]
        public string Description { get; set; }
        public bool Isactive { get; set; }
        public bool Isdelete { get; set; } = false;

        [Column(TypeName = "nvarchar(200)")]
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}
