﻿using KotiCRM.Repository.Data;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly KotiCRMDbContext _context;

        public AccountRepository(KotiCRMDbContext context)
        {
            _context = context;
        }

        public async Task<Account> CreateAccount(Account account)
        {
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return account;
        }

        public async Task<DbResponse> DeleteAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account != null)
            {
                _context.Accounts.Remove(account);
                await _context.SaveChangesAsync();
            }

            else
            {
                return new DbResponse()
                {
                    Status = "Error",
                    Message = "Cannot Delete the account"

                };
            }
            return new DbResponse()
            {
                Status = "Success",
                Message = "Account Deleted successfully"

            };


        }

        public async Task<Account> GetAccountDetails(int id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return null;
            }
            return account;
        }

        public async Task<IEnumerable<Account>> GetAccountList()
        {
            return await _context.Accounts.ToListAsync();
        }

        public async Task<Account> UpdateAccount(int id, Account account)
        {
            if (id == account.Id)
            {
                _context.Entry(account).State = EntityState.Modified;
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return account;
        }
    }
}
