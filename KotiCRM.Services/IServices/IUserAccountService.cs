

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
        ResponseStatus GetRoleName(string roleId);
        Task<ResponseStatus> CreateNewRole(string roleName);
        DDListResponse GetUserTypeListDD();
        IEnumerable<ResponseApplicationUserModel> GetUserList(int companyId);
        ResponseStatus DeleteUser(string userId);
        UserDataResponse GetUserDataById(string userId);
    }
}
