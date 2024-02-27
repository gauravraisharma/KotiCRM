using KotiCRM.Repository.DAL;
using KotiCRM.Repository.Models;
using KotiCRM.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    public class RoleManagerController : Controller
    {
        private readonly IUserService _userService;

        public RoleManagerController(IUserService userService)
        {
            _userService = userService;
        }

        //[HttpPost]
        //[Route("CreateRole")]

        //public async Task<IActionResult> CreateRole([FromBody] Role role)
        //{
        //    var result = await 
        //}
    }
}
