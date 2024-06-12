using Azure;
using KotiCRM.Repository.DTOs.AccountDTO;
using KotiCRM.Repository.Models;
using KotiCRM.Server.Authentication;
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
        [Authorize(Policy = Policies.Accounts_View)]
        public async Task<AccountWithCountDTO> GetAccountList(string? searchQuery, int? pageNumber, int? pageSize)
        {
            return await _accountService.GetAccountList(searchQuery, pageNumber, pageSize);
        }

        [HttpGet("GetAccountDetails/{id}")]
        [Authorize(Policy = Policies.Accounts_View)]
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
        [Authorize(Policy = Policies.Accounts_Add)]
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
        [Authorize(Policy = Policies.Accounts_Edit)]
        public async Task<IActionResult> UpdateAccount(int id, Account account)
        {
            return Ok(await _accountService.UpdateAccount(id, account));

        }


        [HttpDelete("DeleteAccount/{id}")]
        [Authorize(Policy = Policies.Accounts_Delete)]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            return Ok(await _accountService.DeleteAccount(id));
        }
    }
}
