
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using Microsoft.Extensions.Configuration;
using KotiCRM.Repository.IRepository;

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


        public ResponseStatus GetRoleName(string roleId)
        {
            return _accountRepository.GetRoleName(roleId);
        }

        public IEnumerable<ResponseApplicationUserModel> GetUserList()
        {
            return _accountRepository.GetUserList();
        }

        public DDListResponse GetUserTypeListDD()
        {
            return _accountRepository.GetUserTypeListDD();
        }

        public Task<LoginStatus> UserLogin(UserLoginModel userModel)
        {
            return _accountRepository.UserLogin(userModel);
        }
        public ResponseStatus DeleteUser(string userId)
        {
            return _accountRepository.DeleteUser(userId);
        }

        public UserDataResponse GetUserDataById(string userId)
        {
            return _accountRepository.GetUserDataById(userId);
        }


    }
}
