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
        public string OwnerID { get; set; }
        [Required]
        public string Subject { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        [ForeignKey("Contact")]
        [Required]
        public int ContactID { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string PurchaseOrder { get; set; }
        public InvoiceStatus Status { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string BillingStreet { get; set; }
        [Column(TypeName = "nvarchar(100)")]

        public string BillingCity { get; set; }
        [Column(TypeName = "nvarchar(100)")]

        public string BillingState { get; set; }
        [Column(TypeName = "nvarchar(100)")]

        public string BillingCode { get; set; }
        [Column(TypeName = "nvarchar(100)")]

        public string BillingCountry { get; set; }
        [Column(TypeName = "nvarchar(max)")]

        public string TermsAndConditions { get; set; }
        [Column(TypeName = "nvarchar(450)")]

        public string Description { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal SubTotal { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Discount { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Adjustments { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal GrandTotal { get; set; }



    }
}
