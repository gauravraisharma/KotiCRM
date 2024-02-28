using KotiCRM.Repository.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class Invoice
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public int OwnerID { get; set; }
        public string Subject { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        public int ContactID { get; set; }
        public string PurchaseOrder { get; set; }
        public StatusInvoice Status { get; set; }
        public string BillingStreet { get; set; }
        public string BillingCity { get; set; }
        public string BillingState { get; set; }
        public string BillingCode { get; set; }
        public string BillingCountry { get; set; }
        public string TermsAndConditions { get; set; }
        public string Description { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Adjustments { get; set; }
        public decimal GrandTotal { get; set; }
    }
}
