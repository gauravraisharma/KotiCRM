using Azure;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        [Route("GetAccountList")]
        public async Task<IEnumerable<Account>> GetAccountList()
        {
            return await _accountService.GetAccountList();
        }

        [HttpGet("GetAccountDetails/{id}")]
        public async Task<ActionResult<Account>> GetAccountDetails(int id)
        {

            var response = await _accountService.GetAccountDetails(id);
                if(response == null){
                return BadRequest();
            }
            return Ok(response);
        }

        [HttpPost]
        [Route("CreateAccount")]
        public async Task<ActionResult<Account>> CreateAccount(Account account)
        {
            var response = await _accountService.CreateAccount(account);
            if (response == null || !response.Succeed)
            {
                return StatusCode(500,response.Message);
            }
            return Ok(response);
        }

        [HttpPut("UpdateAccount/{id}")]
        public async Task<IActionResult> UpdateAccount(int id, Account account)
        {
            return Ok(await _accountService.UpdateAccount(id, account));

        }


        [HttpDelete("DeleteAccount/{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            return Ok(await _accountService.DeleteAccount(id));
        }
    }
}
