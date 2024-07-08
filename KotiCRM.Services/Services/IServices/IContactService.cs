using KotiCRM.Repository.DTOs.Contact;
using KotiCRM.Repository.Models;

namespace KotiCRM.Services.IServices;

public interface IContactService
{
    Task<ContactDTO> CreateContact(ContactDTO contactDTO);
    Task<ContactWithAccountNameListAndTotalCountDTO> GetContactList(int? accountId, string? searchQuery, int? pageNumber, int? pageSize);
    Task<ContactWithAccountNameDTO> GetContactDetails(int id);
    Task<DbResponse> DeleteContact(int id);
    Task<ContactDTO> UpdateContact(ContactDTO contactDTO);
}