

using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.IServices
{
    public interface IUserAccountService
    {
        Task<LoginStatus> UserLogin(UserLoginModel userModel);
        Task<ResponseStatus> CreateApplicationUser(ApplicationUserModel userModel);
        Task<ResponseStatus> UpdateApplicationUser(UpdateApplicationUserModel userModel);
        Task<ResponseStatus> GetRoleName(string roleId);
        Task<ResponseStatus> CreateNewRole(string roleName);
        DDListResponse GetUserTypeListDD();
        IEnumerable<ResponseApplicationUserModel> GetUserList();
        ResponseStatus DeleteUser(string userId);
        Task<ModulePermissionResponse> GetModulePermission(string userId);
        UserDataResponse GetUserDataById(string userId);

        // For Employee
        Task<ResponseStatus> CreateEmployee(CreateEmployeeDTO createEmployeeDTO);
        Task<IEnumerable<UserDetailModel>> GetUsers();
    }
}
