using KotiCRM.Repository.Models;

namespace KotiCRM.Repository.DTOs.Invoice;

public class InvoiceWithItemsDTO
{
    public InvoiceDTO? Invoice { get; set; }
    public IEnumerable<InvoiceItemDTO>? InvoiceItems { get; set; }
}