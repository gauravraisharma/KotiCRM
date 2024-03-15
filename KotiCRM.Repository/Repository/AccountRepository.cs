using KotiCRM.Repository.Data;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly KotiCRMDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountRepository(KotiCRMDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<DbResponse> CreateAccount(Account account)
        {
            try
            {
                var ownerFound = await _userManager.FindByIdAsync(account.OwnerId.ToString());
                var userRoles = await _userManager.GetRolesAsync(ownerFound);

                if (ownerFound == null)
                {
                    return new DbResponse()
                    {
                        Succeed = false,
                        Message = "Account owner not found"

                    };
                }
                // Check if the user has the required role and permission
                var userHasPermission = (from permission in _context.Permissions
                                         join role in _context.Roles on permission.RoleID equals role.Id
                                         join modules in _context.Modules on permission.ModuleID equals modules.Id
                                         where userRoles.Contains(role.Name)
                                         select permission)
                                             .Any(permission => permission.Add);
                if (!userHasPermission)
                {
                    return new DbResponse()
                    {
                        Succeed = false,
                        Message = "Owner does not have the required permission."

                    };
                }
                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();
                return new DbResponse()
                {
                    Succeed = true,
                    Message = "Account added successfully"
                };
            }
            catch (Exception ex)
            {
                return new DbResponse()
                {
                    Succeed = false,
                    Message = ex.Message

                };
            }
        }


        public async Task<DbResponse> DeleteAccount(int id)
        {
            try
            {
                var account = await _context.Accounts.FindAsync(id);
                if (account != null)
                {
                    account.Isdelete = true;
                    await _context.SaveChangesAsync(); 

                    return new DbResponse()
                    {
                        Succeed = true,
                        Message = "Account deleted successfully"
                    };
                }
                else
                {
                    // Account not found
                    return new DbResponse()
                    {
                        Succeed = false,
                        Message = "Account not found"
                    };
                }
            }
            catch (Exception ex)
            {
                return new DbResponse()
                {
                    Succeed =  false,
                    Message = ex.Message

                };
            }
        }

        public async Task<Account> GetAccountDetails(int id)
        {
            try
            {
                var account = await _context.Accounts.FirstOrDefaultAsync(account => account.Id == id && !account.Isdelete);

                if (account == null)
                {
                    throw new Exception($"Contact with ID {id} was not found.");
                }
                return account;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<Account>> GetAccountList()
        {
            try
            {
                return await _context.Accounts.Where(account => !account.Isdelete).ToListAsync();
            }
            catch(Exception ex) 
            {
                throw new Exception(ex.Message, ex);

            }
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
            catch (DbUpdateConcurrencyException ex)
            {
                throw new Exception("Concurrency conflict occurred. The entity has been modified or deleted by another user.", ex);
            }
            return account;
        }
    }
}
