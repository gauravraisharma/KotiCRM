using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.IServices
{
    public interface IAccountService
    {
        Task<DbResponse> CreateAccount(Account account);
        Task<IEnumerable<Account>> GetAccountList();
        Task<Account> GetAccountDetails(int id);
        Task<DbResponse> DeleteAccount(int id);
        Task<Account> UpdateAccount(int id, Account account);
    }
}
