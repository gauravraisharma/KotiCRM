using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaxationController : ControllerBase
    {
        private readonly ITaxationService _taxationService;

        public TaxationController(ITaxationService taxationService)
        {
            _taxationService = taxationService;
        }

        [HttpPost]
        [Route("save-common")]
        public IActionResult SaveCommonProperties([FromBody] CommonFormDTO commonProperties)
        {
            try
            {
                if (commonProperties == null)
                {
                    return BadRequest("Common properties are null");
                }

                // Create a new TaxDeclarationDTO object with only common properties
                var taxDeclaration = new TaxDeclarationDTO
                {
                    EmployeeId = commonProperties.EmployeeId,
                    FinancialYear = commonProperties.FinancialYear,
                    Amount = commonProperties.Amount,
                    PAN = commonProperties.PAN,
                    Address = commonProperties.Address,
                };

                // Save the tax declaration
                _taxationService.SaveTaxDeclaration(taxDeclaration);

                return Ok("Common properties saved successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
          
        }
       
    }
}