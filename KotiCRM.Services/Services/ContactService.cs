using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;

        public ContactService(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public async Task<DbResponse> CreateContact(Contact contact)
        {
            var response = await _contactRepository.CreateContact(contact);
            return response;
        }

        public async Task<DbResponse> DeleteContact(int id)
        {
            return await _contactRepository.DeleteContact(id);
        }

        public async Task<Contact> GetContactDetails(int id)
        {
            return await _contactRepository.GetContactDetails(id);
        }

        public async Task<IEnumerable<Contact>> GetContactList()
        {
            return await _contactRepository.GetContactList();
        }

        public async Task<Contact> UpdateContact(int id, Contact contact)
        {
            return await _contactRepository.UpdateContact(id, contact);
        }
    }
}
