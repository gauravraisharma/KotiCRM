using KotiCRM.Repository.Enums;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
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

        [HttpGet]
        [Route("InvoiceStatus")]
        public IActionResult GetInvoiceStatus()
        {
            var enumValues = Enum.GetNames(typeof(InvoiceStatus));
            return Ok(enumValues);
        }

        [HttpGet]
        [Route("AccountStatus")]
        public IActionResult GetAccountStatus()
        {
            var enumValues = Enum.GetNames(typeof(AccountStatus));
            return Ok(enumValues);
        }

        [HttpGet]
        [Route("AccountType")]
        public IActionResult GetAccountType()
        {
            var enumValues = Enum.GetNames(typeof(AccountType));
            return Ok(enumValues);
        }
    }
}
