using KotiCRM.Repository.DTOs.Contact;
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
        private readonly IAccountRepository _accountRepository;
        private readonly IContactRepository _contactRepository;

        public ContactService(IAccountRepository accountRepository, IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
            _accountRepository = accountRepository;
        }

        public async Task<ContactDTO> CreateContact(ContactDTO contactDTO)
        {
            Contact contact = new()
            {
                Id = contactDTO.Id,
                OwnerId = contactDTO.OwnerId,
                FirstName = contactDTO.FirstName,
                LastName = contactDTO.LastName,
                AccountID = contactDTO.AccountID,
                Email = contactDTO.Email,
                Phone = contactDTO.Phone,
                OtherPhone = contactDTO.OtherPhone,
                Mobile = contactDTO.Mobile,
                Title = contactDTO.Title,
                Department = contactDTO.Department,
                DateOfBirth = contactDTO.DateOfBirth,
                HomePhone = contactDTO.HomePhone,
                SkypeID = contactDTO.SkypeID,
                LinkedinURL = contactDTO.LinkedinURL,
                TwitterURL = contactDTO.TwitterURL,
                SecondaryEmail = contactDTO.SecondaryEmail,
                MailingStreet = contactDTO.MailingStreet,
                City = contactDTO.City,
                State = contactDTO.State,
                Zip = contactDTO.Zip,
                Country = contactDTO.Country,
                Description = contactDTO.Description
            };

            Contact createdContact = await _contactRepository.CreateContact(contact);

            ContactDTO createdContactDTO = new()
            {
                Id = createdContact.Id,
                OwnerId = createdContact.OwnerId,
                FirstName = createdContact.FirstName,
                LastName = createdContact.LastName,
                AccountID = createdContact.AccountID,
                Email = createdContact.Email,
                Phone = createdContact.Phone,
                OtherPhone = createdContact.OtherPhone,
                Mobile = createdContact.Mobile,
                Title = createdContact.Title,
                Department = createdContact.Department,
                DateOfBirth = createdContact.DateOfBirth,
                HomePhone = createdContact.HomePhone,
                SkypeID = createdContact.SkypeID,
                LinkedinURL = createdContact.LinkedinURL,
                TwitterURL = createdContact.TwitterURL,
                SecondaryEmail = createdContact.SecondaryEmail,
                MailingStreet = createdContact.MailingStreet,
                City = createdContact.City,
                State = createdContact.State,
                Zip = createdContact.Zip,
                Country = createdContact.Country,
                Description = createdContact.Description
            };

            return createdContactDTO;
        }

        public async Task<DbResponse> DeleteContact(int id)
        {
            return await _contactRepository.DeleteContact(id);
        }

        public async Task<ContactWithAccountNameDTO> GetContactDetails(int id)
        {
            Contact contact = await _contactRepository.GetContactDetails(id);
            Account account = await _accountRepository.GetAccountDetails(contact.AccountID);
            ContactWithAccountNameDTO contactWithAccountNameDTO = new()
            {
                Id = contact.Id,
                OwnerId = contact.OwnerId,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                AccountID = contact.AccountID,
                AccountName = account.AccountName,
                Email = contact.Email,
                Phone = contact.Phone,
                OtherPhone = contact.OtherPhone,
                Mobile = contact.Mobile,
                Title = contact.Title,
                Department = contact.Department,
                DateOfBirth = contact.DateOfBirth,
                HomePhone = contact.HomePhone,
                SkypeID = contact.SkypeID,
                LinkedinURL = contact.LinkedinURL,
                TwitterURL = contact.TwitterURL,
                SecondaryEmail = contact.SecondaryEmail,
                MailingStreet = contact.MailingStreet,
                City = contact.City,
                State = contact.State,
                Zip = contact.Zip,
                Country = contact.Country,
                Description = contact.Description
            };
            return contactWithAccountNameDTO;
        }

        public async Task<IEnumerable<ContactWithAccountNameDTO>> GetContactList()
        {
            IEnumerable<ContactWithAccountNameDTO> contactWithAccountNameDTOs =
            from contact in await _contactRepository.GetContactList()
            join account in await _accountRepository.GetAccountList()
            on contact.AccountID equals account.Id
            select new ContactWithAccountNameDTO
            {
                Id = contact.Id,
                OwnerId = contact.OwnerId,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                AccountID = contact.AccountID,
                AccountName = account.AccountName,
                Email = contact.Email,
                Phone = contact.Phone,
                OtherPhone = contact.OtherPhone,
                Mobile = contact.Mobile,
                Title = contact.Title,
                Department = contact.Department,
                DateOfBirth = contact.DateOfBirth,
                HomePhone = contact.HomePhone,
                SkypeID = contact.SkypeID,
                LinkedinURL = contact.LinkedinURL,
                TwitterURL = contact.TwitterURL,
                SecondaryEmail = contact.SecondaryEmail,
                MailingStreet = contact.MailingStreet,
                City = contact.City,
                State = contact.State,
                Zip = contact.Zip,
                Country = contact.Country,
                Description = contact.Description
            };
            return contactWithAccountNameDTOs;
        }

        public async Task<ContactDTO> UpdateContact(ContactDTO contactDTO)
        {
            if (contactDTO == null)
            {
                throw new ArgumentNullException(nameof(contactDTO), "Contact DTO is null. Please provide data for updating the contact.");
            }
            Contact contact = await _contactRepository.GetContactDetails(contactDTO.Id);
            if (contact == null)
            {
                throw new Exception("Contact not found.");
            }

            contact.OwnerId = contactDTO.OwnerId;
            contact.FirstName = contactDTO.FirstName;
            contact.LastName = contactDTO.LastName;
            contact.AccountID = contactDTO.AccountID;
            contact.Email = contactDTO.Email;
            contact.Phone = contactDTO.Phone;
            contact.OtherPhone = contactDTO.OtherPhone;
            contact.Mobile = contactDTO.Mobile;
            contact.Title = contactDTO.Title;
            contact.Department = contactDTO.Department;
            contact.DateOfBirth = contactDTO.DateOfBirth;
            contact.HomePhone = contactDTO.HomePhone;
            contact.SkypeID = contactDTO.SkypeID;
            contact.LinkedinURL = contactDTO.LinkedinURL;
            contact.TwitterURL = contactDTO.TwitterURL;
            contact.SecondaryEmail = contactDTO.SecondaryEmail;
            contact.MailingStreet = contactDTO.MailingStreet;
            contact.City = contactDTO.City;
            contact.State = contactDTO.State;
            contact.Zip = contactDTO.Zip;
            contact.Country = contactDTO.Country;
            contact.Description = contactDTO.Description;

            var updatedContact = await _contactRepository.UpdateContact(contact);

            ContactDTO updatedContactDTO = new ContactDTO
            {
                Id = updatedContact.Id,
                FirstName = updatedContact.FirstName,
                LastName = updatedContact.LastName,
                OwnerId = updatedContact.OwnerId,
                AccountID = updatedContact.AccountID,
                Email = updatedContact.Email,
                Phone = updatedContact.Phone,
                OtherPhone = updatedContact.OtherPhone,
                Mobile = updatedContact.Mobile,
                Title = updatedContact.Title,
                Department = updatedContact.Department,
                DateOfBirth = updatedContact.DateOfBirth,
                HomePhone = updatedContact.HomePhone,
                SkypeID = updatedContact.SkypeID,
                LinkedinURL = updatedContact.LinkedinURL,
                TwitterURL = updatedContact.TwitterURL,
                SecondaryEmail = updatedContact.SecondaryEmail,
                MailingStreet = updatedContact.MailingStreet,
                City = updatedContact.City,
                State = updatedContact.State,
                Zip = updatedContact.Zip,
                Country = updatedContact.Country,
                Description = updatedContact.Description
            };

            return updatedContactDTO;
        }
    }
}