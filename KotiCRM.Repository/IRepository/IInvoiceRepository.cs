using KotiCRM.Repository.Models;

namespace KotiCRM.Repository.IRepository;

public interface IInvoiceRepository
{
    Task<IEnumerable<InvoiceCreationModel>> GetInvoiceList(int? accountID = null, int? status = null, DateTime? startDate = null, DateTime? endDate = null);
    Task<InvoiceCreationModel> GetInvoiceDetails(int id);
    Task<DbResponse> CreateInvoice(InvoiceCreationModel invoiceModel);
    Task<DbResponse> UpdateInvoiceAsync(InvoiceCreationModel invoiceCreationModel);
    Task<DbResponse> DeleteInvoice(int id);
}