using KotiCRM.Repository.Data;
using KotiCRM.Repository.Enums;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly KotiCRMDbContext _context;

        public InvoiceRepository(KotiCRMDbContext context)
        {
            _context = context;
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

        public async Task<InvoiceCreationModel> GetInvoiceDetails(int id)
        {
            try
            {
                var invoice = await _context.Invoices.FindAsync(id);
                if (invoice == null)
                {
                    throw new Exception($"Invoice with ID {id} was not found.");
                }
                var invoiceItems = await _context.InvoiceItems
                .Where(item => item.InvoiceID == id)
                .ToListAsync();
                var invoiceCreationModels =  new InvoiceCreationModel
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

        public async Task<IEnumerable<InvoiceCreationModel>> GetInvoiceList()
        {
            try
            {
                var invoices =  await _context.Invoices.OrderByDescending(invoice=> invoice.DueDate).ToListAsync();
                var invoiceItems = await _context.InvoiceItems.ToListAsync();
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

        public async Task<DbResponse> DeleteInvoice(int id)
        {
            try
            {
                var invoice = await _context.Invoices.FindAsync(id);
                if (invoice != null)
                {
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

        public async Task<Invoice> UpdateInvoice(int id, Invoice invoice)
        {
            if (id == invoice.ID)
            {
                _context.Entry(invoice).State = EntityState.Modified;
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new Exception("Concurrency conflict occurred. The entity has been modified or deleted by another user.", ex);
            }
            return invoice;
        }
    }
}
