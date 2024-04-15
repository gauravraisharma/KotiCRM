using KotiCRM.Repository.DTOs.Invoice;
using KotiCRM.Repository.Models;

namespace KotiCRM.Services.IServices;
public interface IInvoiceService
{
    Task<IEnumerable<InvoiceCreationModel>> GetInvoiceList(int? accountID = null, int? status = null, DateTime? startDate = null, DateTime? endDate = null);
    Task<InvoiceCreationModel> GetInvoiceDetails(int id);
    Task<DbResponse> CreateInvoice(InvoiceCreationModel invoiceModel);
    Task<DbResponse> UpdateInvoiceAsync(InvoiceWithItemsDTO invoiceWithItemsDTO);
    Task<DbResponse> DeleteInvoice(int id);
}