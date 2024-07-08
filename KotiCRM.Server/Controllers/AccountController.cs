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

        /// Retrieves a paginated list of accounts based on optional search parameters.
        /// Requires the policy "Accounts_View" for authorization.
        [HttpGet]
        [Route("GetAccountList")]
        [Authorize(Policy = Policies.ManageRoles_View)]
        public async Task<AccountWithCountDTO> GetAccountList(string? searchQuery, int? pageNumber, int? pageSize)
        {
            return await _accountService.GetAccountList(searchQuery, pageNumber, pageSize);
        }
        /// Retrieves details of a specific account by its ID.
        /// Requires the policy "Accounts_View" for authorization.
        [HttpGet("GetAccountDetails/{id}")]
        [Authorize(Policy = Policies.ManageRoles_View)]
        public async Task<ActionResult<Account>> GetAccountDetails(int id)
        {

            var response = await _accountService.GetAccountDetails(id);
                if(response == null){
                return BadRequest();// Return BadRequest if account details are not found.
            }
            return Ok(response);
        }
        /// Creates a new account with the provided data.
        /// Requires the policy "Accounts_Add" for authorization.
        [HttpPost]
        [Route("CreateAccount")]
        [Authorize(Policy = Policies.ManageRoles_Add)]
        public async Task<ActionResult<Account>> CreateAccount(Account account)
        {
            var response = await _accountService.CreateAccount(account);
            if (response == null || !response.Succeed)
            {
                return StatusCode(500,response.Message); // Return status code 500 with message if creation fails.
            }
            return Ok(response);
        }
        /// Updates an existing account identified by its ID with the provided data. 
        /// Requires the policy "Accounts_Edit" for authorization.
        [HttpPut("UpdateAccount/{id}")]
        [Authorize(Policy = Policies.ManageRoles_Edit)]
        public async Task<IActionResult> UpdateAccount(int id, Account account)
        {
            return Ok(await _accountService.UpdateAccount(id, account));

        }

        /// Deletes an account identified by its ID. 
        /// Requires the policy "Accounts_Delete" for authorization.
        [HttpDelete("DeleteAccount/{id}")]
        [Authorize(Policy = Policies.ManageRoles_Delete)]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            return Ok(await _accountService.DeleteAccount(id));
        }
    }
}
