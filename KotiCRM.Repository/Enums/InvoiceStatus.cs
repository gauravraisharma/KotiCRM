using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Enums
{
    public enum InvoiceStatus
    {
        Created=1,
        Approved=2,
        Paid=3, 
        Delivered=4,
        Cancelled=5, 
        Pending=6,

    }
}
