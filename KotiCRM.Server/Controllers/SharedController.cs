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
        /// Retrieves a list of industries.
        [Route("GetIndustryList")]
        public async Task<IEnumerable<Industry>> GetIndustryList()
        {
            return await _sharedService.GetIndustryList();
        }

        /// Retrieves a list of account owners.
        [HttpGet]
        [Route("GetAccountOwner")]
        public List<DropDownModel> GetAccountOwner()
        {
            return  _sharedService.GetAccountOwner();
        }
        /// Retrieves a list of invoice owners.
        [HttpGet]
        [Route("GetInvoiceOwner")]
        public List<DropDownModel> GetInvoiceOwner()
        {
            return _sharedService.GetInvoiceOwner();
        }
        /// Retrieves a list of invoice statuses.
        [HttpGet]
        [Route("InvoiceStatus")]
        public IActionResult GetInvoiceStatus()
        {

            var enumValues = Enum.GetValues(typeof(InvoiceStatus)).Cast<InvoiceStatus>();
            var enumList = enumValues.Select(e => new { Value =(int) e, Name = e.ToString() }).ToList();
            return Ok(enumList);
        }
        /// Retrieves a list of account statuses.
        [HttpGet]
        [Route("AccountStatus")]
        public IActionResult GetAccountStatus()
        {
            var enumValues = Enum.GetValues(typeof(AccountStatus)).Cast<AccountStatus>();
            var enumList = enumValues.Select(e => new { Value = (int)e, Name = e.ToString() }).ToList();
            return Ok(enumList);
           
        }
        /// Retrieves a list of account types.
        [HttpGet]
        [Route("AccountType")]
        public IActionResult GetAccountType()
        {
            var enumValues = Enum.GetValues(typeof(AccountType)).Cast<AccountType>();
            var enumList = enumValues.Select(e => new { Value = (int)e, Name = e.ToString() }).ToList();
            return Ok(enumList);
        }
        /// Retrieves a list of departments.

        [HttpGet]
        [Route("GetDepartmentList")]
        public async Task<IEnumerable<Department>> GetDepartmentList()
        {
            return await _sharedService.GetDepartmentList();
        }
        /// Retrieves a list of designations.
        [HttpGet]
        [Route("GetDesignationList")]
        public async Task<IEnumerable<Designation>> GetDesignationList()
        {
            return await _sharedService.GetDesignationList();
        }
        /// Retrieves a list of banks.
        [HttpGet]
        [Route("GetBankList")]
        public async Task<IEnumerable<Bank>> GetBankList()
        {
            return await _sharedService.GetBankList();
        }
        /// Retrieves a list of shifts.
        [HttpGet]
        [Route("GetShiftList")]
        public async Task<IEnumerable<Shift>> GetShiftList()
        {
            return await _sharedService.GetShiftList();
        }
        /// Retrieves the employee ID.
        [HttpGet]
        [Route("GetEmployeeId")]
        public string GetEmployeeId()
        {
            return _sharedService.GetEmployeeId();
        }
    }
}
