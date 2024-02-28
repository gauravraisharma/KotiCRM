﻿using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.IServices
{
    public interface IContactService
    {
        Task<Contact> CreateContact(Contact contact);
        Task<IEnumerable<Contact>> GetContactList();
        Task<Contact> GetContactDetails(int id);
        Task<DbResponse> DeleteContact(int id);
        Task<Contact> UpdateContact(int id, Contact contact);
    }
}
