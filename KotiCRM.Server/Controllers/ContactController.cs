﻿using KotiCRM.Repository.DTOs.Contact;
using KotiCRM.Server.Authentication;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ContactController : Controller
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        [Route("GetContactList")]
        [Authorize(Policy = Policies.Contacts_View)]
        public async Task<ContactWithAccountNameListAndTotalCountDTO> GetContactList(int? accountId, string? searchQuery, int? pageNumber, int? pageSize)
        {
            return await _contactService.GetContactList(accountId, searchQuery, pageNumber, pageSize);
        }

        [HttpGet("GetContactDetails/{id}")]
        [Authorize(Policy = Policies.Contacts_View)]
        public async Task<ActionResult<ContactWithAccountNameDTO>> GetContactDetails(int id)
        {
            return Ok(await _contactService.GetContactDetails(id));
        }

        [HttpPost]
        [Route("CreateContact")]
        [Authorize(Policy = Policies.Contacts_Add)]
        public async Task<ActionResult<ContactDTO>> CreateContact(ContactDTO contactDTO)
        {
            return Ok(await _contactService.CreateContact(contactDTO));
        }

        [HttpPut("UpdateContact")]
        [Authorize(Policy = Policies.Contacts_Edit)]
        public async Task<ActionResult<ContactDTO>> UpdateContact(ContactDTO contactDTO)
        {
            return Ok(await _contactService.UpdateContact(contactDTO));
        }


        [HttpDelete("DeleteContact/{id}")]
        [Authorize(Policy = Policies.Contacts_Delete)]
        public async Task<IActionResult> DeleteContact(int id)
        {
            return Ok(await _contactService.DeleteContact(id));
        }
    }
}