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
        // Method to create a new contact in the database
        public async Task<Contact> CreateContact(Contact contact)
        {
            try
            {
                _context.Contacts.Add(contact); // Adding the contact to the context
                await _context.SaveChangesAsync(); // Saving changes asynchronously
                return contact;// Returning the created contact
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);// Throwing an exception if something goes wrong
            }
        }
        // Method to get contact details by ID
        public async Task<Contact> GetContactDetails(int id)
        {
            try
            {
                var contact = await _context.Contacts.FindAsync(id); // Finding the contact by ID

                if (contact == null)// If the contact is not found, throw an exception
                {
                    throw new Exception($"Contact with ID {id} was not found.");
                }
                return contact;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);// Throwing an exception if something goes wrong
            }
        }
        // Method to get a list of all contacts
        public async Task<IEnumerable<Contact>> GetContactList()
        {
            try
            {
                return await _context.Contacts.OrderByDescending(c => c.Id).ToListAsync(); // Returning the list of contacts ordered by ID in descending order
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex); // Throwing an exception if something goes wrong

            }
        }
        // Method to delete a contact by ID
        public async Task<DbResponse> DeleteContact(int id)
        {
            try
            {
                var contact = await _context.Contacts.FindAsync(id);// Finding the contact by ID
                if (contact != null)
                {
                    _context.Contacts.Remove(contact);// Removing the contact from the context
                    await _context.SaveChangesAsync(); // Saving changes asynchronously
                    return new DbResponse()
                    {
                        Succeed = true,
                        Message = "Contact deleted successfully" // Returning a success response
                    };
                }
                else
                {
                    // Contact not found, return a failure response
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
                    Message = ex.Message// Returning a failure response with the exception message
                };
            }
        }
        // Method to update an existing contact
        public async Task<Contact> UpdateContact(Contact contact)
        {
            try
            {
                _context.Entry(contact).State = EntityState.Modified;// Setting the state of the entity to modified
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