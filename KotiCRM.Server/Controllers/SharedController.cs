using KotiCRM.Repository.Enums;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
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
        [Route("GetAccountOwner")]
        public List<DropDownModel> GetAccountOwner()
        {
            return  _sharedService.GetAccountOwner();
        }
        [HttpGet]
        [Route("GetInvoiceOwner")]
        public List<DropDownModel> GetInvoiceOwner()
        {
            return _sharedService.GetInvoiceOwner();
        }

        [HttpGet]
        [Route("InvoiceStatus")]
        public IActionResult GetInvoiceStatus()
        {

            var enumValues = Enum.GetValues(typeof(InvoiceStatus)).Cast<InvoiceStatus>();
            var enumList = enumValues.Select(e => new { Value =(int) e, Name = e.ToString() }).ToList();
            return Ok(enumList);
        }

        [HttpGet]
        [Route("AccountStatus")]
        public IActionResult GetAccountStatus()
        {
            var enumValues = Enum.GetValues(typeof(AccountStatus)).Cast<AccountStatus>();
            var enumList = enumValues.Select(e => new { Value = (int)e, Name = e.ToString() }).ToList();
            return Ok(enumList);
           
        }

        [HttpGet]
        [Route("AccountType")]
        public IActionResult GetAccountType()
        {
            var enumValues = Enum.GetValues(typeof(AccountType)).Cast<AccountType>();
            var enumList = enumValues.Select(e => new { Value = (int)e, Name = e.ToString() }).ToList();
            return Ok(enumList);
        }

    }
}
