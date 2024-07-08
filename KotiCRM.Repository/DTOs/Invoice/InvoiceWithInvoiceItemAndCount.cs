using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.Invoice
{
    public class InvoiceWithInvoiceItemAndCount
    {
        public int InvoiceCount { get; set; }
        public IEnumerable<InvoiceWithItemsDTO> Invoices { get; set; }
    }
}
