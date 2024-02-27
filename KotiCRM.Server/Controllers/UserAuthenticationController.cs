using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    public class UserAuthenticationController : Controller
    {
        private IConfiguration _config;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserAuthenticationController(IConfiguration config, SignInManager<ApplicationUser> signInManager)
        {
            _config = config;
            _signInManager = signInManager;

        }
        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] ApplicationUser user)
        {
            IActionResult response = Unauthorized();
            var userLogin = AuthenticateUser(user);

            if (ModelState.IsValid)
            {

                //var result = await _signInManager.PasswordSignInAsync(user.UserName, user.Password, user.RememberMe, lockoutOnFailure: false);


                if (userLogin != null)

                {
                    var tokenString = GenerateJSONWebToken(user);
                    response = Ok(new { token = tokenString });
                }
            }

            return response;
        }
        private string GenerateJSONWebToken(ApplicationUser userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private ApplicationUser AuthenticateUser(ApplicationUser login)
        {
            ApplicationUser user = null;

            if (login.UserName == "Admin")
            {
                user = new ApplicationUser { UserName = "Admin", Password = "abc@123" };
            }
            return user;
        }
    }
}
