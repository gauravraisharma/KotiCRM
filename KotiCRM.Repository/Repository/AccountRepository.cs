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

        // Method to create a new account
        public async Task<DbResponse> CreateAccount(Account account)
        {
            try
            {
                // Find the account owner by ID
                var ownerFound = await _userManager.FindByIdAsync(account.OwnerId.ToString());
                // Get the roles of the account owner
                var userRoles = await _userManager.GetRolesAsync(ownerFound);

                // Check if the owner is found
                if (ownerFound == null)
                {
                    return new DbResponse()
                    {
                        Succeed = false,
                        Message = "Account owner not found"

                    };
                }

                // Check if the owner has the required permission
                var userHasPermission = (from permission in _context.Permissions
                                         join role in _context.Roles on permission.RoleID equals role.Id
                                         join modules in _context.Modules on permission.ModuleID equals modules.Id
                                         where userRoles.Contains(role.Name)
                                         select permission)
                                             .Any(permission => permission.Add);
                // If owner does not have the required permission
                if (!userHasPermission)
                {
                    return new DbResponse()
                    {
                        Succeed = false,
                        Message = "Owner does not have the required permission."
                    };
                }
                // Add the account to the context
                _context.Accounts.Add(account);
                // Save changes to the database
                await _context.SaveChangesAsync();
                return new DbResponse()
                {
                    // Return a response indicating failure with the exception message
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

        // Method to delete an account by setting the Isdelete flag to true
        public async Task<DbResponse> DeleteAccount(int id)
        {
            try
            {
                // Find the account by ID
                var account = await _context.Accounts.FindAsync(id);
                if (account != null)
                {
                    // Set Isdelete flag to true
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
                // Return a response indicating failure with the exception message
                return new DbResponse()
                {
                    Succeed = false,
                    Message = ex.Message

                };
            }
        }
        // Method to get account details by ID
        public async Task<Account> GetAccountDetails(int id)
        {
            try
            {
                // Find the account that is not deleted by ID
                var account = await _context.Accounts.FirstOrDefaultAsync(account => account.Id == id && !account.Isdelete);
                // If account is not found, throw an exception
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
        // Method to get a list of accounts that are not deleted
        public async Task<IEnumerable<Account>> GetAccountList()
        {
            try
            {
                // Return the list of accounts ordered by ID in descending order

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
        // Method to update account details
        public async Task<Account> UpdateAccount(int id, Account account)
        {
            // Check if the ID matches the account ID
            if (id == account.Id)
            {
                // Set the entity state to modified
                _context.Entry(account).State = EntityState.Modified;
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                // Throw a concurrency exception if an error occurs
                throw new Exception("Concurrency conflict occurred. The entity has been modified or deleted by another user.", ex);
            }
            return account;
        }
    }
}
