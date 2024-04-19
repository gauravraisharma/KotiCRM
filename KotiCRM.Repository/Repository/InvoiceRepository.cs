using KotiCRM.Repository.Data;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace KotiCRM.Repository.Repository
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly KotiCRMDbContext _context;

        public InvoiceRepository(KotiCRMDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<InvoiceCreationModel>> GetInvoiceList(int? accountID = null, int? status = null, DateTime? startDate = null, DateTime? endDate = null)
        {
            try
            {
                // Set default start date and end date if not provided
                startDate ??= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                endDate ??= new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month));

                var invoices = await _context.Invoices
                    .Where(invoice => !invoice.Isdelete)
                    .Where(invoice => accountID == null || invoice.AccountID == accountID)
                    .Where(invoice => status == null || (int)invoice.Status == status)
                    .Where(invoice => invoice.DueDate >= startDate && invoice.DueDate <= endDate)
                    .OrderByDescending(invoice => invoice.DueDate)
                    .ToListAsync();

                var invoiceIds = invoices.Select(invoice => invoice.ID).ToList();

                var invoiceItems = await _context.InvoiceItems
                    .Where(invoiceItem => !invoiceItem.IsDeleted)
                    .Where(invoiceItem => invoiceIds.Contains(invoiceItem.InvoiceID))
                    .ToListAsync();

                var invoiceCreationModels = invoices.Select(invoice => new InvoiceCreationModel
                {
                    Invoice = invoice,
                    InvoiceItems = invoiceItems.Where(item => item.InvoiceID == invoice.ID).ToList()
                });

                return invoiceCreationModels;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<InvoiceCreationModel> GetInvoiceDetails(int id)
        {
            try
            {
                var invoice = await _context.Invoices.FirstOrDefaultAsync(invoice => invoice.ID == id && !invoice.Isdelete);
                if (invoice == null)
                {
                    throw new Exception($"Invoice with ID {id} was not found.");
                }
                var invoiceItems = await _context.InvoiceItems
                .Where(item => item.InvoiceID == id && !invoice.Isdelete)
                .ToListAsync();
                var invoiceCreationModels = new InvoiceCreationModel
                {
                    Invoice = invoice,
                    InvoiceItems = invoiceItems
                };

                return invoiceCreationModels;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<DbResponse> CreateInvoice(InvoiceCreationModel invoiceModel)
        {
            try
            {
                // Add invoice to context
                _context.Invoices.Add(invoiceModel.Invoice);

                // Save changes to generate InvoiceId
                await _context.SaveChangesAsync();

                // Set InvoiceId for invoice items
                foreach (var item in invoiceModel.InvoiceItems)
                {
                    item.InvoiceID = invoiceModel.Invoice.ID;
                }

                // Add invoice items to context
                _context.InvoiceItems.AddRange(invoiceModel.InvoiceItems);

                // Save changes
                await _context.SaveChangesAsync();

                return new DbResponse()
                {
                    Succeed = true,
                    Message = "Invoice and invoice items added successfully"
                };
            }
            catch (Exception ex)
            {
                return new DbResponse()
                {
                    Succeed = false,
                    Message = ex.Message
                };
            }
        }

        public async Task<DbResponse> UpdateInvoiceAsync(InvoiceCreationModel invoiceCreationModel)
        {
            try
            {
                // Update Invoice
                _context.Entry(invoiceCreationModel.Invoice).State = EntityState.Modified;

                // Update InvoiceItems
                foreach (var invoiceItem in invoiceCreationModel.InvoiceItems)
                {
                    // Check if the invoice item is already tracked by the context
                    var existingItem = _context.InvoiceItems.Find(invoiceItem.ID);
                    if (existingItem != null)
                    {
                        // If the item exists in the database, update it if it hasn't been modified by another process
                        _context.Entry(existingItem).CurrentValues.SetValues(invoiceItem);
                    }
                    else
                    {
                        // If the item doesn't exist, add it to the context
                        _context.InvoiceItems.AddRange(invoiceItem);
                    }
                }

                    await _context.SaveChangesAsync();

                return new DbResponse()
                {
                    Succeed = true,
                    Message = "Invoice and invoice items updated successfully"
                };
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return new DbResponse()
                {
                    Succeed = false,
                    Message = ex.Message
                };
            }
            catch (Exception ex)
            {
                return new DbResponse()
                {
                    Succeed = false,
                    Message = ex.Message
                };
            }
        }

        public async Task<DbResponse> DeleteInvoice(int id)
        {
            try
            {
                var invoice = await _context.Invoices.FindAsync(id);
                var invoiceItems = await _context.InvoiceItems.Where(invoiceItem => invoiceItem.InvoiceID == id).ToListAsync();

                if (invoice != null && invoiceItems != null)
                {
                    foreach (var item in invoiceItems)
                    {
                        item.IsDeleted = true;
                    }
                    invoice.Isdelete = true;
                    await _context.SaveChangesAsync();
                    return new DbResponse()
                    {
                        Succeed = true,
                        Message = "Invoice  deleted successfully"
                    };
                }
                else
                {
                    // Invoice not found
                    return new DbResponse()
                    {
                        Succeed = false,
                        Message = "Invoice not found"
                    };
                }
            }
            catch (Exception ex)
            {
                return new DbResponse()
                {
                    Succeed = false,
                    Message = ex.Message
                };
            }
        }
    }
}
