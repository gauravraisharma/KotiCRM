using KotiCRM.Repository.Data;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly KotiCRMDbContext _context;
        private readonly IConfiguration _config;
        public UserRepository(UserManager<ApplicationUser> userManager, KotiCRMDbContext context, IConfiguration config)
        {
            _userManager = userManager;
            _context = context;
            _config = config;
        }

        public async Task<ReturnTask> CreateUser(ApplicationUser user)
        {
            var result = await _userManager.CreateAsync(user, "Password123!");
            if (result.Succeeded)
            {
                //_context.Users.Add(user);
                //await _context.SaveChangesAsync();
                return new ReturnTask { Succeed = true, Message = "User added successfully!" };
            }
            else
            {
                return new ReturnTask { Succeed = false, Message = "User not added, please try again!" };
            }

        }


        private async Task<string> GenerateToken(ApplicationUser user, bool rememberMe)
        {
            try
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                //Find UserRole 
                var userRoles = await _userManager.GetRolesAsync(user);

                List<Claim> claims = new List<Claim> {
                    new Claim(ClaimTypes.Name,user.UserName),
                    new Claim(ClaimTypes.Role,userRoles.FirstOrDefault().ToUpper())
                };

                var token = new JwtSecurityToken(claims: claims, expires: rememberMe ? DateTime.Now.AddDays(30) : DateTime.Now.AddHours(12), signingCredentials: credentials);
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}
