using KotiCRM.Repository.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class Invoice
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Account")]
        [Required]
        public int AccountID { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? OwnerID { get; set; }

        [Required]
        public string? Subject { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }

        [ForeignKey("Contact")]
        [Required]
        public int ContactID { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string? DealName { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string? PurchaseOrder { get; set; }
        public InvoiceStatus Status { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? FromBillingStreet { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? FromBillingCity { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? FromBillingState { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? FromZipCode { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? FromBillingCountry { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? ToBillingStreet { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? ToBillingCity { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? ToBillingState { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? ToZipCode { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? ToBillingCountry { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? TermsAndConditions { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Description { get; set; }

        public bool Isdelete { get; set; } = false;

        [Column(TypeName = "nvarchar(200)")]
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string? ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }

    }
}
