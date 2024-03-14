using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class InvoiceCreationModel
    {
        public Invoice Invoice { get; set; }
        public List<InvoiceItem> InvoiceItems { get; set; }
    }
}
