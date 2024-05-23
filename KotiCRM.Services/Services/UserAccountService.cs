
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using Microsoft.Extensions.Configuration;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.DTOs.AccountDTO;
using System.Drawing.Printing;
using ApplicationService.Utilities;
using KotiCRM.Repository.DTOs.RoleManagement;
using Microsoft.AspNetCore.Http;

namespace KotiCRM.Services.Services
{
    public class UserAccountService : IUserAccountService
    {
        private readonly IUserAccountRepository _accountRepository;
        private readonly IConfiguration _config;
        private readonly IEmailService _emailService;
        private readonly IProfilePictureRepository _profilePictureRepository;


        public UserAccountService(IUserAccountRepository accountRepository, IConfiguration config, IEmailService emailService, IProfilePictureRepository profilePictureRepository)
        {
            _accountRepository = accountRepository;
            _config = config;
            _emailService = emailService;
            _profilePictureRepository = profilePictureRepository;
        }

        public async Task<ResponseStatus> CreateApplicationUser(ApplicationUserModel userModel)
        {
            var response = await _accountRepository.CreateApplicationUser(userModel);
            if (response.Status == "SUCCEED")
                try
                {
                    var emailSubject = _config["NewUserRegisterEmailSubject"];
                    var emailTemplate = _config["NewUserRegisterEmailTemplate"];

                    Dictionary<string, string> messageVariable = new Dictionary<string, string> {
                      { "@@username", userModel.UserName },
                      { "@@password", userModel.Password },
                    };

                    //  MailOperations.SendEmailAsync(new List<string> { userModel.Email } , emailSubject, emailTemplate, _config, null, messageVariable);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);

                }
            return response;
        }
        public Task<ResponseStatus> UpdateApplicationUser(UpdateApplicationUserModel userModel)
        {
            return _accountRepository.UpdateApplicationUser(userModel);
        }

        public async Task<RolesResponseStatus> GetRoles(string? searchQuery, int? pageNumber, int? pageSize )
        {
            return await _accountRepository.GetRoles(searchQuery, pageNumber, pageSize);
        }
        public async Task<RoleResponseStatus> GetRole(string roleId)
        {
            return await _accountRepository.GetRole(roleId);
        }
        public Task<RoleResponse> CreateNewRole(CreateUpdateRoleDTO createUpdateRoleDTO)
        {
            return _accountRepository.CreateNewRole(createUpdateRoleDTO);
        }
        public async Task<RoleResponseStatus> UpdateRole(CreateUpdateRoleDTO createUpdateRoleDTO)
        {
            return await _accountRepository.UpdateRole(createUpdateRoleDTO);
        }
        public async Task<ResponseStatus> DeleteRole(string roleId)
        {
            return await _accountRepository.DeleteRole(roleId);
        }
        public Task<ResponseStatus> GetRoleName(string roleId)
        {
            return _accountRepository.GetRoleNameAsync(roleId);
        }

        public IEnumerable<ResponseApplicationUserModel> GetUserList()
        {
            return _accountRepository.GetUserList();
        }

        public DDListResponse GetUserTypeListDD()
        {
            return _accountRepository.GetUserTypeListDD();
        }

        public async Task<LoginStatus> UserLogin(UserLoginModel userModel)
        {

            var loginStatus = await _accountRepository.UserLogin(userModel);

            return loginStatus;
        }
        public ResponseStatus DeleteUser(string userId)
        {
            return _accountRepository.DeleteUser(userId);
        }
        public Task<ModulePermissionResponse> GetModulePermissions(string userType)
        {
            return _accountRepository.GetModulePermissions(userType);
        }
        public Task<ModulePermissionResponse> GetModulePermission(string userId)
        {
            return _accountRepository.GetModulePermission(userId);
        }
        // get module
        public async Task<IEnumerable<GetModulesDTO>> GetModulesAsync()
        {
            return await _accountRepository.GetAllModulesAsync();
        }
        public async Task<ResponseStatus> CreateModulePermission(List<CreateModulePermissionDTO> createModulePermissions)
        {
            return await _accountRepository.CreateModulePermission(createModulePermissions);
        }
        public async Task<ResponseStatus> UpdateModulePermission(List<UpdateModulePermissionDTO> updateModulePermissions)
        {
            return await _accountRepository.UpdateModulePermission(updateModulePermissions);
        }

        public UserDataResponse GetUserDataById(string userId)
        {
            return _accountRepository.GetUserDataById(userId);
        }
        // For Employee
        public async Task<EmployeeWithCountDTO> GetEmployees(string? searchQuery, int? pageNumber, int? pageSize)
        {

            EmployeeWithCountDTO users = await _accountRepository.GetEmployees(searchQuery, pageNumber, pageSize);

            foreach (var user in users.Employee)
            {
                if (!String.IsNullOrEmpty(user.ProfilePicturePath))
                {
                    user.ProfilePicturePath = _profilePictureRepository.GetImagePathByEmployeeId(user.ProfilePicturePath);
                }
            }
            return users;
        }


        //public async Task<EmployeeWithCountDTO> GetEmployees(string? searchQuery, int? pageNumber, int? pageSize)
        //{
        //    var usersList = (from userAccount in await _accountRepository.GetEmployees()
        //                     where (string.IsNullOrEmpty(searchQuery) ||
        //                     userAccount.Name.Contains(searchQuery, StringComparison.OrdinalIgnoreCase) ||
        //                     userAccount.EmployeeCode.Contains(searchQuery, StringComparison.OrdinalIgnoreCase) ||
        //                     (userAccount.BloodGroup != null && userAccount.BloodGroup.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)) ||
        //                     (userAccount.BirthDate.HasValue && userAccount.BirthDate.Value.ToString() == searchQuery) ||
        //                     userAccount.Designation.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)

        //                     )
        //                     select userAccount)
        //                    .Skip(pageNumber.HasValue && pageSize.HasValue ? (pageNumber.Value - 1) * pageSize.Value : 0)
        //                    .Take(pageNumber.HasValue && pageSize.HasValue ? pageSize.Value : 10);

        //    var users = await _accountRepository.GetEmployees();
        //    int count = users.Count();
        //    return new EmployeeWithCountDTO { Employee = usersList, UserCount = count };
        //}

        public EmployeeResponse GetEmployeeById(string employeeId)
        {
            EmployeeResponse userResponse =  _accountRepository.GetEmployeeById(employeeId);

            if (!String.IsNullOrEmpty(userResponse.employeeData.ProfilePictureURL))
            {
                userResponse.employeeData.ProfilePictureURL = _profilePictureRepository.GetImagePathByEmployeeId(userResponse.employeeData.ProfilePictureURL);
            }


            return userResponse;

        }
        // for create Employee
        public async Task<EmployeeResponseStatus> CreateEmployee(CreateEmployeeDTO createEmployeeDTO)
        {
           
            if (createEmployeeDTO.ProfilePicture != null)
            {
                try
                {
                   createEmployeeDTO.ProfilePicturePath = await _profilePictureRepository.UploadProfilePicture(createEmployeeDTO.ProfilePicture, createEmployeeDTO.EmployeeId);
                }
                catch (Exception ex)
                {
                    throw new Exception("profile picture");
                }
            }

            var dbResponse =   await _accountRepository.CreateEmployee(createEmployeeDTO);
            return dbResponse;
        }
        //public async Task<EmployeeResponseStatus> UpdateEmployee(CreateEmployeeDTO createEmployeeDTO)
        //{
        //    return await _accountRepository.UpdateEmployee(createEmployeeDTO);
        //}

       //for update employee
        public async Task<EmployeeResponseStatus> UpdateEmployee(CreateEmployeeDTO createEmployeeDTO)
        {
            try
            {
                if (createEmployeeDTO.ProfilePicture != null)
                {
                    createEmployeeDTO.ProfilePicturePath = await _profilePictureRepository.UploadProfilePicture(createEmployeeDTO.ProfilePicture, createEmployeeDTO.EmployeeId);
                }

                // Update employee details
                var dbResponse = await _accountRepository.UpdateEmployee(createEmployeeDTO);

                return dbResponse;
            }
            catch (Exception ex)
            {
                // Handle exception accordingly, maybe log it or throw a more specific exception
                throw new Exception("Failed to update employee", ex);
            }
        }

        public ResponseStatus DeleteEmployee(string employeeId)
        {
            return _accountRepository.DeleteEmployee(employeeId);
        }

        public async Task<ChangePasswordDbResponse> ChangePassword(ChangePasswordRequest passwordData)
        {
            var result = await _accountRepository.ChangePassword(passwordData);

            if (passwordData.isEmailSent == true)
            {
                
                
                var emailMessage = new EmailMessage
                {

                    Subject = "New Password generated",
                    Recipients = new List<System.Net.Mail.MailAddress>
                    {
                        new System.Net.Mail.MailAddress(result.Email)
                    },
                    Template = Repository.Enums.EmailTemplate.ChangePasswordTemplate,
                    TemplateDynamicPlaceholders = new Dictionary<string, string>
                    {
                        {"##UserFullName##",result.UserFullName},
                        {"##Email##", result.Email },
                        {"##NewPassword##", result.NewPassword},
                       
                    }
                };

                try
                {
                    await _emailService.SendMailAsync(emailMessage);
                   
                }
                catch (Exception ex)
                {
                   Console.WriteLine(ex.ToString());
                }

            }
            

            return result;
        }

        public Task<string> UploadProfilePicture(IFormFile profilePicture)
        {
            throw new NotImplementedException();
        }
    }
}
