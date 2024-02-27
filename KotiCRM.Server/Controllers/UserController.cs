using KotiCRM.Repository.Models;
using KotiCRM.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
       
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost]
        [Route("CreateUser")]

        public async Task<IActionResult> CreateUser([FromBody] ApplicationUser applicationUser)
        {

            var response = await _userService.CreateUser(applicationUser);
            return Ok(response);
            
        }
    }
}
