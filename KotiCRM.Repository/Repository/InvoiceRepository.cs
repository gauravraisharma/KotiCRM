using KotiCRM.Repository.Data;
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

        public async Task<DbResponse> CreateInvoice(Invoice invoice)
        {
            try
            {
                _context.Invoices.Add(invoice);
                await _context.SaveChangesAsync();
                return new DbResponse()
                {
                    Succeed = true,
                    Message = "Invoice added successfully"
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

        public async Task<Invoice> GetInvoiceDetails(int id)
        {
            try
            {
                var invoice = await _context.Invoices.FindAsync(id);

                if (invoice == null)
                {
                    throw new Exception($"Invoice with ID {id} was not found.");
                }
                return invoice;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<Invoice>> GetInvoiceList()
        {
            try
            {
                return await _context.Invoices.ToListAsync();
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
                    _context.Invoices.Remove(invoice);
                    await _context.SaveChangesAsync();
                    return new DbResponse()
                    {
                        Succeed = true,
                        Message = "Invoice deleted successfully"
                    };
                }
                else
                {
                    // invoice not found
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
