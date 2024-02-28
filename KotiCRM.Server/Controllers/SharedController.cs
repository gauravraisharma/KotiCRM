using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace KotiCRM.Server.Controllers
{
    public class SharedController : Controller
    {
        private readonly ISharedService _sharedService;
        public SharedController(ISharedService sharedService)
        {
            _sharedService = sharedService;
        }
        [HttpGet]
        [Route("GetIndustryList")]
        public async Task<IEnumerable<Industry>> GetIndustryList()
        {
            return await _sharedService.GetIndustryList();
        }
    }
}
