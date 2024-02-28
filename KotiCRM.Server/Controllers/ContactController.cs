using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace KotiCRM.Server.Controllers
{
    public class ContactController : Controller
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
             _contactService =  contactService;
        }

        [HttpGet]
        [Route("GetContactList")]
        public async Task<IEnumerable<Contact>> GetContactList()
        {
            return await _contactService.GetContactList();
        }

        [HttpGet("GetContactDetails/{id}")]
        public async Task<ActionResult<Contact>> GetContactDetails(int id)
        {
            return Ok(await _contactService.GetContactDetails(id));
        }

        [HttpPost]
        [Route("CreateContact")]
        public async Task<ActionResult<Account>> CreateContact(Contact contact)
        {
            return Ok(await _contactService.CreateContact(contact));
        }

        [HttpPut("UpdateContact/{id}")]

        public async Task<IActionResult> UpdateContact(int id, Contact contact)
        {
            return Ok(await _contactService.UpdateContact(id, contact));
        }


        [HttpDelete("DeleteContact/{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            return Ok(await _contactService.DeleteContact(id));
        }
    }
}
