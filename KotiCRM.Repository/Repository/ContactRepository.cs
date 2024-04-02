using KotiCRM.Repository.Data;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace KotiCRM.Repository.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly KotiCRMDbContext _context;

        public ContactRepository(KotiCRMDbContext context)
        {
            _context = context;
        }
        public async Task<Contact> CreateContact(Contact contact)
        {
            try
            {
                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();
                return contact;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<Contact> GetContactDetails(int id)
        {
            try
            {
                var contact = await _context.Contacts.FindAsync(id);

                if (contact == null)
                {
                    throw new Exception($"Contact with ID {id} was not found.");
                }
                return contact;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<Contact>> GetContactList()
        {
            try
            {
                return await _context.Contacts.OrderByDescending(c => c.Id).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);

            }
        }

        public async Task<DbResponse> DeleteContact(int id)
        {
            try
            {
                var contact = await _context.Contacts.FindAsync(id);
                if (contact != null)
                {
                    _context.Contacts.Remove(contact);
                    await _context.SaveChangesAsync();
                    return new DbResponse()
                    {
                        Succeed = true,
                        Message = "Contact deleted successfully"
                    };
                }
                else
                {
                    // Contact not found
                    return new DbResponse()
                    {
                        Succeed = false,
                        Message = "Contact not found"
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
        public async Task<Contact> UpdateContact(Contact contact)
        {
            try
            {
                _context.Entry(contact).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new Exception("Concurrency conflict occurred. The entity has been modified or deleted by another user.", ex);
            }
            return contact;
        }
    }
}