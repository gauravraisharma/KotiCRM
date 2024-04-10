using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.Models;
using KotiCRM.Server.Authentication;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace KotiCRM.Server.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class UserAccountController : Controller
    {

        private readonly IUserAccountService _accountService;

        public UserAccountController(IUserAccountService accountService)
        {
            _accountService = accountService;
        }

        //LoginUser method is used to check user credential and allow login into application 
        //It will return the token in response if user is valid
        [AllowAnonymous]
        [HttpPost("LoginUser")]
        public async Task<IActionResult> LoginUser(UserLoginModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please Login with proper username and password");
            }
            var loginStatus = await _accountService.UserLogin(userModel);

            if (loginStatus.Status == "SUCCEED")
            {
                return Ok(loginStatus);
            }
            else
            {
                return BadRequest(loginStatus.Message);
            }
        }

        //It will create the application user
        [Authorize(Roles = "Administrator")]
        [HttpPost("CreateApplicationUser")]
        public async Task<IActionResult> CreateApplicationUser(ApplicationUserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please pass the valid Input.");
            }


            var responseStatus = await _accountService.CreateApplicationUser(userModel);

            if (responseStatus.Status == "SUCCEED")
            {
                return Ok(responseStatus);
            }
            else
            {
                return BadRequest(responseStatus.Message);
            }

        }

        //It will update the application user
        [Authorize(Roles = "Administrator")]
        [HttpPost("updateApplicationUser")]
        public async Task<IActionResult> UpdateApplicationUser(UpdateApplicationUserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please pass the valid Input.");
            }


            var responseStatus = await _accountService.UpdateApplicationUser(userModel);

            if (responseStatus.Status == "SUCCEED")
            {
                return Ok(responseStatus);
            }
            else
            {
                return BadRequest(responseStatus.Message);
            }

        }


        //It will create the application Role
        [Authorize(Roles = "Administrator")]
        [HttpGet("CreateNewRole/{roleName}")]
        public async Task<IActionResult> CreateNewRole(string roleName)
        {
            if (string.IsNullOrEmpty(roleName))
            {
                return BadRequest("Please pass the valid Input.");
            }

            var responseStatus = await _accountService.CreateNewRole(roleName);

            if (responseStatus.Status == "SUCCEED")
            {
                return Ok(responseStatus.Message);
            }
            else
            {
                return BadRequest(responseStatus.Message);
            }

        }
        //This method is used to get List of department 


        //This method is used to get List of Roles 
        [Authorize(Policy = Policies.Accounts)]
        [HttpGet("GetUserTypeListDD")]
        public ActionResult GetUserTypeListDD()
        {
            var dbResponse = _accountService.GetUserTypeListDD();
            if (dbResponse.Status == "FAILED")
            {
                return BadRequest();
            }
            return Ok(dbResponse.DdList);
        }


        [Authorize(Roles = "Administrator")]
        //This method is used to get List of Roles
        [HttpGet("GetUserList")]
        public ActionResult GetUserList()
        {
            var dbResponse = _accountService.GetUserList();

            return Ok(dbResponse);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("getUserDataById/{userId}")]
        public ActionResult GetUserDataById(string userId)
        {
            var dbResponse = _accountService.GetUserDataById(userId);

            return Ok(dbResponse);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("DeleteUser/{userId}")]
        public ActionResult DeleteUser(string userId)
        {
            var dbResponse = _accountService.DeleteUser(userId);
            if (dbResponse.Status == "FAILED")
            {
                return BadRequest();
            }
            return Ok(dbResponse);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("GetModulePermission/{userId}")]
        public async Task<ActionResult> GetModulePermission(string userId)
        {
            var dbResponse = await _accountService.GetModulePermission(userId);
            if (dbResponse.Status == "FAILED")
            {
                return BadRequest();
            }
            return Ok(dbResponse);
        }

        // It will create employee
        [Authorize(Roles = "Administrator")]
        [HttpPost("CreateEmployee")]
        public async Task<ActionResult> CreateEmployee(CreateEmployeeDTO createEmployeeDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please pass the valid Input.");
            }
            var responseStatus = await _accountService.CreateEmployee(createEmployeeDTO);

            if (responseStatus.Status == "SUCCEED")
            {
                return Ok(responseStatus);
            }
            else
            {
                return BadRequest(responseStatus.Message);
            }
        }

    }
}
