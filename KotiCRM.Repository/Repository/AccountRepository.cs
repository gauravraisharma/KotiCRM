using KotiCRM.Repository.Data;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;

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
                    Succeed = false,
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
                //var accountList = (from account in _context.Accounts
                //                   join industry in _context.Industry on account.IndustryId equals industry.Id
                //                   select new AccountDTO
                //                   {
                //                       Id = account.Id,
                //                       OwnerId = account.OwnerId,
                //                       AccountName = account.AccountName,
                //                       Industry = industry.Name,
                //                       AnnualRevenue = account.AnnualRevenue,
                //                       Status = account.Status,
                //                       Phone = account.Phone,
                //                       Fax = account.Fax,
                //                       WebSite = account.WebSite,
                //                       Type = account.Type,
                //                       BillingStreet = account.BillingStreet,
                //                       BillingCity = account.BillingCity,
                //                       BillingState = account.BillingState,
                //                       ZipCode = account.ZipCode,
                //                       Country = account.Country,
                //                       Description = account.Description,
                //                       Isactive = account.Isactive,
                //                       Isdelete = account.Isdelete,
                //                       CreatedBy = account.CreatedBy,
                //                       CreatedOn = account.CreatedOn,
                //                       ModifiedBy = account.ModifiedBy,
                //                       ModifiedOn = account.ModifiedOn
                //                   }).ToList();
                return await _context.Accounts.Where(account => !account.Isdelete).OrderByDescending(a => a.Id).ToListAsync();
            }
            catch (Exception ex)
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
