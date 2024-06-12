using KotiCRM.Repository.DTOs.RoleManagement;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.Models;
using KotiCRM.Server.Authentication;
using KotiCRM.Services.IServices;
using KotiCRM.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
                return BadRequest(loginStatus);
            }
        }

        //It will create the application user
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

        //It will update the application user
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

        // Role Management

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

        //It will create the application Role
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


        //This method is used to get List of Roles 
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

        //This method is used to get List of Roles
        [HttpGet("GetUserList")]
        [Authorize(Policy = Policies.Accounts_View)]
        public ActionResult GetUserList()
        {
            var dbResponse = _accountService.GetUserList();

            return Ok(dbResponse);
        }

        [HttpGet("getUserDataById/{userId}")]
        [Authorize(Policy = Policies.Accounts_View)]
        public ActionResult GetUserDataById(string userId)
        {
            var dbResponse = _accountService.GetUserDataById(userId);

            return Ok(dbResponse);
        }

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

        // get modules
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

        // create module permission


        [HttpPost] // Use HttpPost for creation
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


        //This method is used to get List of Employees
        [HttpGet]
        [Route("GetUsers")]
        [Authorize(Policy = Policies.Accounts_View)]
        public async Task<EmployeeWithCountDTO> GetEmployees(string? searchQuery, int? pageNumber, int? pageSize)
       {
            var users = await _accountService.GetEmployees(searchQuery, pageNumber, pageSize);

            return users;
        }

        //This method is used to get Employee by id
        [HttpGet]
        [Route("GetEmployeeById/{employeeId}")]
        [Authorize(Policy = Policies.Accounts_View)]
        public ActionResult GetEmployeeById(string employeeId)
        {
            var response = _accountService.GetEmployeeById(employeeId);
            return Ok(response);
        }

        // This method is used to create Employee
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


