using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class InvoiceItem
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Invoice")]
        [Required]
        public int InvoiceID { get; set; }
        public int Sno { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string ProductName { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Description { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(18, 2)")]

        public decimal Amount { get; set; }
        [Column(TypeName = "decimal(18, 2)")]

        public decimal Discount { get; set; }
        [Column(TypeName = "decimal(18, 2)")]

        public decimal Tax { get; set; }
        [Column(TypeName = "decimal(18, 2)")]

        public decimal Total { get; set; }
    }
}
