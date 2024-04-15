using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.IRepository
{
    public interface IUserAccountRepository
    {
        Task<LoginStatus> UserLogin(UserLoginModel userModel);
        Task<ResponseStatus> CreateApplicationUser(ApplicationUserModel userModel);
        Task<ResponseStatus> UpdateApplicationUser(UpdateApplicationUserModel userModel);
        Task<ResponseStatus> GetRoleNameAsync(string roleId);
        Task<ResponseStatus> CreateNewRole(string roleName);
        DDListResponse GetUserTypeListDD();
        IEnumerable<ResponseApplicationUserModel> GetUserList();
        ResponseStatus DeleteUser(string userId);
        Task<ModulePermissionResponse> GetModulePermission(string userId);

        UserDataResponse GetUserDataById(string userId);

        // For Employee
        Task<IEnumerable<GetEmployeesDTO>> GetEmployees();
        EmployeeResponse GetEmployeeById(string employeeId);
        Task<EmployeeResponseStatus> CreateEmployee(CreateEmployeeDTO createEmployeeDTO);
        Task<EmployeeResponseStatus> UpdateEmployee(CreateEmployeeDTO createEmployeeDTO);
        ResponseStatus DeleteEmployee(string employeeId);
    }
}
