
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using Microsoft.Extensions.Configuration;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.DTOs.AccountDTO;
using System.Drawing.Printing;

namespace KotiCRM.Services.Services
{
    public class UserAccountService : IUserAccountService
    {
        private readonly IUserAccountRepository _accountRepository;
        private readonly IConfiguration _config;

        public UserAccountService(IUserAccountRepository accountRepository, IConfiguration config)
        {
            _accountRepository = accountRepository;
            _config = config;
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

                }
            return response;
        }
        public Task<ResponseStatus> UpdateApplicationUser(UpdateApplicationUserModel userModel)
        {
            return _accountRepository.UpdateApplicationUser(userModel);
        }

        public Task<ResponseStatus> CreateNewRole(string roleName)
        {
            return _accountRepository.CreateNewRole(roleName);
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
        public Task<ModulePermissionResponse> GetModulePermission(string userId)
        {
            return _accountRepository.GetModulePermission(userId);
        }

        public UserDataResponse GetUserDataById(string userId)
        {
            return _accountRepository.GetUserDataById(userId);
        }

        // For Employee
        public async Task<EmployeeWithCountDTO> GetEmployees(string? searchQuery, int? pageNumber, int? pageSize)
        {
            var usersList = (from userAccount in await _accountRepository.GetEmployees()
                               where (string.IsNullOrEmpty(searchQuery) ||
                               userAccount.Name.Contains(searchQuery, StringComparison.OrdinalIgnoreCase) ||
                               userAccount.EmployeeCode.Contains(searchQuery, StringComparison.OrdinalIgnoreCase) ||
                               userAccount.BloodGroup.Contains(searchQuery, StringComparison.OrdinalIgnoreCase) ||
                               userAccount.BirthDate.HasValue && userAccount.BirthDate.Value.ToString() == searchQuery ||
                               userAccount.Designation.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)

                               )
                             select userAccount)
                            .Skip(pageNumber.HasValue && pageSize.HasValue ? (pageNumber.Value - 1) * pageSize.Value : 0)
                            .Take(pageNumber.HasValue && pageSize.HasValue ? pageSize.Value : 10);

            var users = await _accountRepository.GetEmployees();
            int count = users.Count();
            return new EmployeeWithCountDTO { Employee = usersList, UserCount = count };
        }
        public EmployeeResponse GetEmployeeById(string employeeId)
        {
            return _accountRepository.GetEmployeeById(employeeId);
        }
        public async Task<EmployeeResponseStatus> CreateEmployee(CreateEmployeeDTO createEmployeeDTO)
        {
            return await _accountRepository.CreateEmployee(createEmployeeDTO);
        }
        public async Task<EmployeeResponseStatus> UpdateEmployee(CreateEmployeeDTO createEmployeeDTO)
        {
            return await _accountRepository.UpdateEmployee(createEmployeeDTO);
        }
        public ResponseStatus DeleteEmployee(string employeeId)
        {
            return _accountRepository.DeleteEmployee(employeeId);
        }
    }
}