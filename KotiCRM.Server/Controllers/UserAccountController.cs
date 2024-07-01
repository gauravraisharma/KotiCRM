using KotiCRM.Repository.DTOs.ForgotPasswordDTO;
using KotiCRM.Repository.DTOs.RoleManagement;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.Models;
using KotiCRM.Server.Authentication;
using KotiCRM.Services.IServices;
using KotiCRM.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]// Authorize the entire controller using Bearer authentication scheme
    public class UserAccountController : Controller
    {
        private readonly IUserAccountService _accountService;
        private readonly UserManager<ApplicationUser> _userManager;


        public UserAccountController(IUserAccountService accountService, UserManager<ApplicationUser> userManager)
        {
            _accountService = accountService;
            _userManager = userManager;
         
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
                return BadRequest(loginStatus);
            }
        }
        // ForgotPassword API
        [HttpPost]
        [AllowAnonymous]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDTO forgotPasswordDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid input.");
            }

            var responseStatus = await _accountService.ForgotPassword(forgotPasswordDTO);

            if (responseStatus.Status == "SUCCEED")
            {
                return Ok(new { message = responseStatus.Message });
            }
            else
            {
                return BadRequest(new { message = responseStatus.Message });
            }
        }

        //[HttpPost]
        //[AllowAnonymous]
        //[Route("ResetPassword")]
        //public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
        //{
        //    var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == resetPassword.Email);

        //    if(user != null)
        //    {
        //        resetPassword.Token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(resetPassword.Token));

        //        var responseStatus = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
        //        if (responseStatus.Succeeded)
        //        {
        //            return Ok();
        //        }
        //    }

        //    return BadRequest("Password not reset");            
        //}

        [HttpPost]
        [AllowAnonymous]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isPasswordReset = await _accountService.ResetPassword(resetPassword.Email, resetPassword.Token, resetPassword.Password);

            if (isPasswordReset)
            {
                return Ok(isPasswordReset);
            }

            return BadRequest("Password reset failed");
        }


        // CreateApplicationUser method creates a new application user
        // Requires Accounts_Add policy
        [HttpPost("CreateApplicationUser")]
        [Authorize(Policy = Policies.Accounts_Add)]
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

        // UpdateApplicationUser method updates an existing application user
        // Requires Accounts_Edit policy
        [HttpPost("updateApplicationUser")]
        [Authorize(Policy = Policies.Accounts_Edit)]
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

        // GetRoles method retrieves a list of roles based on search query and pagination parameters
        // Requires Accounts_View policy
        [HttpGet("GetRoles")]
        [Authorize(Policy = Policies.Accounts_View)]
        public async Task<ActionResult> GetRoles(string? searchQuery, int? pageNumber, int? pageSize)
        {
            var dbResponse = await _accountService.GetRoles(searchQuery, pageNumber, pageSize);
            if (dbResponse.Status == "FAILED")
            {
                return BadRequest();
            }
            return Ok(dbResponse);
        }
        // GetRole method retrieves a specific role by its ID
        // Requires Accounts_View policy
        [HttpGet("GetRole/{roleId}")]
        [Authorize(Policy = Policies.Accounts_View)]
        public async Task<ActionResult> GetRole(string roleId)
        {
            var dbResponse = await _accountService.GetRole(roleId);
            if (dbResponse.Status == "FAILED")
            {
                return BadRequest();
            }
            return Ok(dbResponse);
        }
        // CreateNewRole method creates a new role
        // Requires Accounts_Add policy
        [HttpPost]
        [Route("CreateNewRole")]
        [Authorize(Policy = Policies.Accounts_Add)]
        public async Task<IActionResult> CreateNewRole(CreateUpdateRoleDTO createUpdateRoleDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please pass the valid Input.");
            }

            var responseStatus = await _accountService.CreateNewRole(createUpdateRoleDTO);

            if (responseStatus.Status == "SUCCEED")
            {
                return Ok(responseStatus);
            }
            else
            {
                return BadRequest(responseStatus.Message);
            }

        }
        // UpdateRole method updates an existing role
        // Requires Accounts_Edit policy
        [HttpPut]
        [Route("UpdateRole")]
        [Authorize(Policy = Policies.Accounts_Edit)]
        public async Task<ActionResult> UpdateRole(CreateUpdateRoleDTO createUpdateRoleDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please pass the valid Input.");
            }
            var responseStatus = await _accountService.UpdateRole(createUpdateRoleDTO);

            if (responseStatus.Status == "SUCCEED")
            {
                return Ok(responseStatus);
            }
            else
            {
                return BadRequest(responseStatus.Message);
            }
        }
        // DeleteRole method deletes a specific role by its ID
        // Requires Accounts_Delete policy
        [HttpGet("DeleteRole/{roleId}")]
        [Authorize(Policy = Policies.Accounts_Delete)]
        public async Task<ActionResult> DeleteRole(string roleId)
        {
            var dbResponse = await _accountService.DeleteRole(roleId);
            if (dbResponse.Status == "FAILED")
            {
                return BadRequest();
            }
            return Ok(dbResponse);
        }


        // GetUserTypeListDD method retrieves a list of user types
        // Requires Accounts_View policy
        [HttpGet("GetUserTypeListDD")]
        [Authorize(Policy = Policies.Accounts_View)]
        public ActionResult GetUserTypeListDD()
        {
            var dbResponse = _accountService.GetUserTypeListDD();
            if (dbResponse.Status == "FAILED")
            {
                return BadRequest();
            }
            return Ok(dbResponse.DdList);
        }

        // GetUserList method retrieves a list of users
        // Requires Accounts_View policy
        [HttpGet("GetUserList")]
        [Authorize(Policy = Policies.Accounts_View)]
        public ActionResult GetUserList()
        {
            var dbResponse = _accountService.GetUserList();

            return Ok(dbResponse);
        }
        // GetUserDataById method retrieves user data by user ID
        // Requires Accounts_View policy
        [HttpGet("getUserDataById/{userId}")]
        [Authorize(Policy = Policies.Accounts_View)]
        public ActionResult GetUserDataById(string userId)
        {
            var dbResponse = _accountService.GetUserDataById(userId);

            return Ok(dbResponse);
        }
        // DeleteUser method deletes a specific user by user ID
        // Requires Accounts_Delete policy
        [HttpGet("DeleteUser/{userId}")]
        [Authorize(Policy = Policies.Accounts_Delete)]
        public ActionResult DeleteUser(string userId)
        {
            var dbResponse = _accountService.DeleteUser(userId);
            if (dbResponse.Status == "FAILED")
            {
                return BadRequest();
            }
            return Ok(dbResponse);
        }
        // GetModulePermissions method retrieves module permissions by user type
        // Requires Accounts_View policy

        [HttpGet("GetModulePermissions/{userType}")]
        [Authorize(Policy = Policies.Accounts_View)]
        public async Task<ActionResult> GetModulePermissions(string userType)
        {
            var dbResponse = await _accountService.GetModulePermissions(userType);
            if (dbResponse.Status == "FAILED")
            {
                return BadRequest();
            }
            return Ok(dbResponse);
        }

        // GetModules method retrieves a list of all modules
        // Requires Accounts_View policy
        [HttpGet("GetModules")]
        [Authorize(Policy = Policies.Accounts_View)]
        public async Task<ActionResult<IEnumerable<GetModulesDTO>>> GetModules()
        {
            try
            {
                var modules = await _accountService.GetModulesAsync();

                if (modules == null || !modules.Any())
                {
                    return NotFound();
                }
                return Ok(modules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        // GetModulePermission method retrieves module permissions by user ID
        // Requires Accounts_View policy
        [HttpGet("GetModulePermission/{userId}")]
        [Authorize(Policy = Policies.Accounts_View)]
        public async Task<ActionResult> GetModulePermission(string userId)
        {
            var dbResponse = await _accountService.GetModulePermission(userId);
            if (dbResponse.Status == "FAILED")
            {
                return BadRequest();
            }
            return Ok(dbResponse);
        }

        // CreateModulePermission method creates new module permissions
        // Requires Accounts_Add policy
        [HttpPost]
        [Route("CreateModulePermission")]
        [Authorize(Policy = Policies.Accounts_Add)]
        public async Task<ActionResult> CreateModulePermission(List<CreateModulePermissionDTO> createModulePermissions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please pass valid input.");
            }

            var responseStatus = await _accountService.CreateModulePermission(createModulePermissions);

            if (responseStatus.Status == "SUCCEED")
            {
                return Ok(responseStatus);
            }
            else
            {
                return BadRequest(responseStatus.Message);
            }
        }
        // UpdateModulePermission method updates existing module permissions
        // Requires Accounts_Edit policy
        [HttpPut]
        [Route("UpdateModulePermission")]
        [Authorize(Policy = Policies.Accounts_Edit)]
        public async Task<ActionResult> UpdateModulePermission(List<UpdateModulePermissionDTO> updateModulePermissions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please pass the valid Input.");
            }
            var responseStatus = await _accountService.UpdateModulePermission(updateModulePermissions);

            if (responseStatus.Status == "SUCCEED")
            {
                return Ok(responseStatus);
            }
            else
            {
                return BadRequest(responseStatus.Message);
            }
        }

        // GetUsers method retrieves a list of employees based on search query and pagination parameters
        // Requires Accounts_View policy
        [HttpGet]
        [Route("GetUsers")]
        [Authorize(Policy = Policies.Accounts_View)]
        public async Task<EmployeeWithCountDTO> GetEmployees(string? searchQuery, int? pageNumber, int? pageSize)
       {
            var users = await _accountService.GetEmployees(searchQuery, pageNumber, pageSize);

            return users;
        }

        //This method is used to get Employee by id
        // Requires Accounts_View policy
        [HttpGet]
        [Route("GetEmployeeById/{employeeId}")]
        [Authorize(Policy = Policies.Accounts_View)]
        public ActionResult GetEmployeeById(string employeeId)
        {
            var response = _accountService.GetEmployeeById(employeeId);
            return Ok(response);
        }

        // This method is used to create Employee
        // Requires Accounts_Add policy
        [HttpPost]
        [Route("CreateEmployee")]
        [Authorize(Policy = Policies.Accounts_Add)]
        public async Task<ActionResult> CreateEmployee([FromForm] CreateEmployeeDTO createEmployeeDTO )
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

        // This method is used to update Employee
        // Requires Accounts_Edit policy
        [HttpPut]
        [Route("UpdateEmployee")]
        [Authorize(Policy = Policies.Accounts_Edit)]
        public async Task<ActionResult> UpdateEmployee([FromForm]CreateEmployeeDTO createEmployeeDTO )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please pass the valid Input.");
            }

             var responseStatus = await _accountService.UpdateEmployee(createEmployeeDTO);

            if (responseStatus.Status == "SUCCEED")
            {
               
                return Ok(responseStatus);
            }
            else
            {
                return BadRequest(responseStatus.Message);
            }
        }

        // This method is used to delete Employee
        // Requires Accounts_Delete policy
        [HttpGet]
        [Route("DeleteEmployee/{employeeId}")]
        [Authorize(Policy = Policies.Accounts_Delete)]
        public ActionResult DeleteEmployee(string employeeId)
        {
            var dbResponse = _accountService.DeleteEmployee(employeeId);
            if (dbResponse.Status == "FAILED")
            {
                return BadRequest();
            }
            return Ok(dbResponse);
        }

        // This method is used to change a user's password
        // Requires Accounts_Edit policy
        [HttpPost]
        [Route("ChangePassword")]
        [Authorize(Policy = Policies.Accounts_Edit)]
        public async Task<ActionResult<string>> ChangePassword(ChangePasswordRequest passwordData)
        {
            if (passwordData == null || string.IsNullOrEmpty(passwordData.userID) || string.IsNullOrEmpty(passwordData.newPassword))
            {
                return BadRequest("Invalid input");
            }

            var result = await _accountService.ChangePassword(passwordData);

            if (result== null)
            {
                return NotFound("Password change failed: User not found or unable to change password.");
            }
            if (passwordData.isEmailSent)
            {
                return Ok("Your Password has been changed successfully. Email sent: true");
            }
            else
            {
                return Ok("Your Password has been changed successfully. Email sent: false");
            }
        }


    }
}


