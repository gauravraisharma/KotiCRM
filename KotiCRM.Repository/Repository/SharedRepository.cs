using KotiCRM.Repository.Data;
using KotiCRM.Repository.Enums;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class SharedRepository : ISharedRepository
    {
        private readonly KotiCRMDbContext _context;

        public SharedRepository(KotiCRMDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Industry>> GetIndustryList()
        {
            try
            {
                return await _context.Industry.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);

            }
        }
        
        
        public List<DropDownModel> GetAccountOwner()
        {
            try
            {

                var result = (from users in _context.Users
                              join userRoles in _context.UserRoles on users.Id equals userRoles.UserId
                              join Permissions in _context.Permissions on userRoles.RoleId equals Permissions.RoleID
                              where Permissions.ModuleID== (int)Modules.Accounts && Permissions.Add && Permissions.Edit && Permissions.Delete && Permissions.View 
                              select new DropDownModel
                              {
                                  Id = users.Id,
                                  Label=users.FirstName+' '+users.LastName,
                                  FirstName = users.FirstName,
                                  LastName = users.LastName,
                                  Email = users.Email
                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);

            }
        }
        public List<DropDownModel> GetInvoiceOwner()
        {
            try
            {

                var result = (from users in _context.Users
                              join userRoles in _context.UserRoles on users.Id equals userRoles.UserId
                              join Permissions in _context.Permissions on userRoles.RoleId equals Permissions.RoleID
                              where Permissions.ModuleID == (int)Modules.Invoices && Permissions.Add && Permissions.Edit && Permissions.Delete && Permissions.View
                              select new DropDownModel
                              {
                                  Id = users.Id,
                                  Label = users.FirstName + ' ' + users.LastName,
                                  FirstName = users.FirstName,
                                  LastName = users.LastName,
                                  Email = users.Email
                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);

            }
        }
    }
}
