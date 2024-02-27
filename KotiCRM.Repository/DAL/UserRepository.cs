using KotiCRM.Repository.Data;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DAL
{
    public class UserRepository:IUserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly KotiCRMDbContext _context;

        public UserRepository(UserManager<ApplicationUser> userManager, KotiCRMDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<DbResponse> CreateUser(ApplicationUser user)
        {
            var result = await _userManager.CreateAsync(user, "Password123!");
            if (result.Succeeded)
            {
                //_context.Users.Add(user);
                //await _context.SaveChangesAsync();
                return new DbResponse { Status = "SUCCESS", Message = "User added successfully!" };
            }
            else
            {
                return new DbResponse { Status = "ERROR", Message = "User not added, please try again!" };
            }

        }
    }
}
