using KotiCRM.Repository.DTOs.RoleManagement;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.Models;
using KotiCRM.Server.Authentication;
using KotiCRM.Services.IServices;
using KotiCRM.Services.Services;
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

        // Role Management

        [HttpGet("GetRoles")]
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
        //[Authorize(Roles = "Administrator")]
        [HttpPost]
        [Route("CreateNewRole")]
        public async Task<IActionResult> CreateNewRole(CreateUpdateRoleDTO createUpdateRoleDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Please pass the valid Input.");
            }

            var responseStatus = await _accountService.CreateNewRole(createUpdateRoleDTO);

            if (responseStatus.Status == "SUCCEED")
            {
                return Ok(responseStatus.Message);
            }
            else
            {
                return BadRequest(responseStatus.Message);
            }

        }

        [HttpPut]
        [Route("UpdateRole")]
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

        [HttpGet("GetModulePermissions/{userType}")]
        public async Task<ActionResult> GetModulePermissions(string userType)
        {
            var dbResponse = await _accountService.GetModulePermissions(userType);
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

        [HttpPut]
        [Route("UpdateModulePermission")]
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
        public async Task<EmployeeWithCountDTO> GetEmployees(string? searchQuery, int? pageNumber, int? pageSize)
        {
            var users = await _accountService.GetEmployees(searchQuery, pageNumber, pageSize);

            return users;
        }

        //This method is used to get Employee by id
        [HttpGet]
        [Route("GetEmployeeById/{employeeId}")]
        public ActionResult GetEmployeeById(string employeeId)
        {
            var response = _accountService.GetEmployeeById(employeeId);
            return Ok(response);
        }

        // This method is used to create Employee
        [HttpPost]
        [Route("CreateEmployee")]
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
        public async Task<ActionResult> UpdateEmployee(CreateEmployeeDTO createEmployeeDTO)
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


