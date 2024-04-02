using KotiCRM.Repository.Models;

namespace KotiCRM.Repository.IRepository
{
    public interface IContactRepository
    {
        Task<Contact> CreateContact(Contact contact);
        Task<IEnumerable<Contact>> GetContactList();
        Task<Contact> GetContactDetails(int id);
        Task<DbResponse> DeleteContact(int id);
        Task<Contact> UpdateContact(Contact contact);
    }
}