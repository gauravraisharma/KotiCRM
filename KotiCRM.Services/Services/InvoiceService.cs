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

        public async Task<DbResponse> CreateInvoice(Invoice invoice)
        {
            return await _invoiceRepository.CreateInvoice(invoice);
        }

        public async Task<DbResponse> DeleteInvoice(int id)
        {
            return await _invoiceRepository.DeleteInvoice(id);
        }

        public async Task<Invoice> GetInvoiceDetails(int id)
        {
            return await _invoiceRepository.GetInvoiceDetails(id);
        }

        public async Task<IEnumerable<Invoice>> GetInvoiceList()
        {
            return await _invoiceRepository.GetInvoiceList();
        }

        public async Task<Invoice> UpdateInvoice(int id, Invoice invoice)
        {
            return await _invoiceRepository.UpdateInvoice(id, invoice);
        }
    }
}
