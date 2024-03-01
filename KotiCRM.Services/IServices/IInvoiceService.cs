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
        Task<DbResponse> CreateInvoice(Invoice invoice);
        Task<IEnumerable<Invoice>> GetInvoiceList();
        Task<Invoice> GetInvoiceDetails(int id);
        Task<DbResponse> DeleteInvoice(int id);
        Task<Invoice> UpdateInvoice(int id, Invoice invoice);
    }
}
