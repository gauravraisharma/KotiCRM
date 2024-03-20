using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;

        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public async Task<DbResponse> CreateAccount(Account account)
        {
            var response = await _accountRepository.CreateAccount(account);
            return response;
        }

        public async Task<DbResponse> DeleteAccount(int id)
        {
            return await _accountRepository.DeleteAccount(id);
        }

        public async Task<Account> GetAccountDetails(int id)
        {
            return await _accountRepository.GetAccountDetails(id);
        }

        public async Task<IEnumerable<Account>> GetAccountList()
        {
            return await _accountRepository.GetAccountList();
        }

        public async Task<Account> UpdateAccount(int id, Account account)
        {
            return await _accountRepository.UpdateAccount(id, account);
        }
    }
}