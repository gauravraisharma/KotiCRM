using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.IServices
{
    public interface IInvoiceService
    {
        Task<ReturnTask> CreateInvoice(Invoice invoice);
        Task<IEnumerable<Invoice>> GetInvoiceList();
        Task<Invoice> GetInvoiceDetails(int id);
        Task<ReturnTask> DeleteInvoice(int id);
        Task<Invoice> UpdateInvoice(int id, Invoice invoice);
    }
}
