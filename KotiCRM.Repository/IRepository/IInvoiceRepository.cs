using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.IRepository
{
    public interface IInvoiceRepository
    {
        Task<DbResponse> CreateInvoice(InvoiceCreationModel invoiceModel);
        Task<IEnumerable<InvoiceCreationModel>> GetInvoiceList();
        Task<InvoiceCreationModel> GetInvoiceDetails(int id);
        Task<DbResponse> DeleteInvoice(int id);
        Task<Invoice> UpdateInvoice(int id, Invoice invoice);
    }
}
