using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;

namespace KotiCRM.Services.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IInvoiceRepository _invoiceRepository;

        public InvoiceService(IInvoiceRepository invoiceRepository)
        {
            _invoiceRepository = invoiceRepository;
        }

        public async Task<DbResponse> CreateInvoice(InvoiceCreationModel invoiceModel)
        {
            return await _invoiceRepository.CreateInvoice(invoiceModel);
        }

        public async Task<DbResponse> DeleteInvoice(int id)
        {
            return await _invoiceRepository.DeleteInvoice(id);
        }

        public async Task<InvoiceCreationModel> GetInvoiceDetails(int id)
        {
            return await _invoiceRepository.GetInvoiceDetails(id);
        }

        public async Task<IEnumerable<InvoiceCreationModel>> GetInvoiceList()
        {
            return await _invoiceRepository.GetInvoiceList();
        }

        public async Task<Invoice> UpdateInvoice(int id, Invoice invoice)
        {
            return await _invoiceRepository.UpdateInvoice(id, invoice);
        }
    }
}
