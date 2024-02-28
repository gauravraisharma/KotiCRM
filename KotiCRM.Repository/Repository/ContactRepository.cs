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
    public class ContactRepository : IContactRepository
    {
        private readonly KotiCRMDbContext _context;

        public ContactRepository(KotiCRMDbContext context)
        {
            _context = context;
        }
        public async Task<Contact> CreateContact(Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task<Contact> GetContactDetails(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return null;
            }
            return contact;
        }

        public async Task<IEnumerable<Contact>> GetContactList()
        {
            return await _context.Contacts.ToListAsync();
        }

        public async Task<DbResponse> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact != null)
            {
                _context.Contacts.Remove(contact);
                await _context.SaveChangesAsync();
            }

            else
            {
                return new DbResponse()
                {
                    Status = "Error",
                    Message = "Cannot Delete the account"

                };
            }
            return new DbResponse()
            {
                Status = "Success",
                Message = "Account Deleted successfully"

            };


        }
        public async Task<Contact> UpdateContact(int id, Contact contact)
        {
            if (id == contact.Id)
            {
                _context.Entry(contact).State = EntityState.Modified;
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return contact;
        }
    }
}
