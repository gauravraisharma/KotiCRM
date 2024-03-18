using KotiCRM.Repository.DTOs.Contact;
using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.IServices
{
    public interface IContactService
    {
        Task<ContactDTO> CreateContact(ContactDTO contactDTO);
        Task<IEnumerable<ContactDTO>> GetContactList();
        Task<ContactDTO> GetContactDetails(int id);
        Task<DbResponse> DeleteContact(int id);
        Task<ContactDTO> UpdateContact(ContactDTO contactDTO);
    }
}