using KotiCRM.Repository.DTOs.Contact;
using KotiCRM.Repository.Models;
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
        public async Task<IEnumerable<ContactWithAccountNameDTO>> GetContactList()
        {
            return await _contactService.GetContactList();
        }

        [HttpGet("GetContactDetails/{id}")]
        public async Task<ActionResult<ContactWithAccountNameDTO>> GetContactDetails(int id)
        {
            return Ok(await _contactService.GetContactDetails(id));
        }

        [HttpPost]
        [Route("CreateContact")]
        public async Task<ActionResult<ContactDTO>> CreateContact(ContactDTO contactDTO)
        {
            return Ok(await _contactService.CreateContact(contactDTO));
        }

        [HttpPut("UpdateContact")]

        public async Task<ActionResult<ContactDTO>> UpdateContact(ContactDTO contactDTO)
        {
            return Ok(await _contactService.UpdateContact(contactDTO));
        }


        [HttpDelete("DeleteContact/{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            return Ok(await _contactService.DeleteContact(id));
        }
    }
}
