using KotiCRM.Repository.Constants;
using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.Models;
using KotiCRM.Server.Authentication;
using KotiCRM.Services.IServices;
using KotiCRM.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace KotiCRM.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class TaxDeclarationController : ControllerBase
    {
        private readonly ITaxDeclarationService _taxDeclarationService;
        public TaxDeclarationController(ITaxDeclarationService taxDeclarationService)
        {
            _taxDeclarationService = taxDeclarationService;
        }

        // Endpoint to get Form 12BB for a specific employee and financial year

        [HttpGet]
        [Route("Employee12BB/{employeeId}")]
        public async Task<Employee12BBDTO> GetEmployee12BB(string employeeId)
        {
            if (string.IsNullOrEmpty(employeeId))
            {
                throw new Exception("EmployeeId and FinancialYear are required.");
            }

            // Fetch the records from the service

            var records = await _taxDeclarationService.GetEmployee12BB(employeeId);
            if (records == null)
            {
                throw new Exception("No records found.");
            }
            return records;
        }


        // Endpoint to get all Form 12BB records for a specific employee

        [HttpGet]
        [Route("Employee12BBs/{employeeId}")]
        public async Task<IActionResult> GetEmployee12BBs(string employeeId)
        {
            if (string.IsNullOrEmpty(employeeId))
            {
                return BadRequest("EmployeeId is required.");
            }

            // Fetch the records from the service
            var records = await _taxDeclarationService.GetEmployee12BBs(employeeId);
            if (records == null || !records.Any())
            {
                return NotFound("No records found");
            }
            return Ok(records);
        }


        //save Form 12BB
        // Endpoint to save a new or update an existing Form 12BB record
        [HttpPost]
        [Route("SaveEmployee12BB")]
        public async Task<ActionResult<Employee12BB>> SaveEmployee12BB([FromBody] Employee12BB employee12BB)
        {
            if (string.IsNullOrEmpty(employee12BB.EmployeeId))
            {
                return BadRequest("Employee ID is required.");
            }

            if (employee12BB == null)
            {
                return BadRequest("Employee12BB data is required.");
            }
            // Check for employee ID mismatch

            if (employee12BB.EmployeeId != employee12BB.EmployeeId)
            {
                return BadRequest("Employee ID mismatch.");
            }

            try
            {
                // Save the record using the service
                var savedEmployee12BB = await _taxDeclarationService.SaveEmployee12BB(employee12BB);

                return Ok(savedEmployee12BB);
            }
            catch (Exception ex)
            {
                // Handle errors and return an appropriate response
                return StatusCode(500, "An error occurred while saving Employee12BB data.");
            }
        }

        // Upload Document Proofs
        [HttpPost]
        [Route("UploadDocumentProofs")]
        [RequestFormLimits(MultipartBodyLengthLimit = 104857600)] // 100MB
        public async Task<ActionResult<Task<List<DocumentPaths>>>> UploadDocumentProofs()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var result = await _taxDeclarationService.UploadDocumentProofs(formCollection);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while uploading files.");
            }
        }
        //download
        [HttpGet]
        [Route("DownloadDocumentProof")]
        public async Task<IActionResult> DownloadDocumentProof([FromQuery] string url)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(url))
                {
                    return BadRequest("The URL parameter is required.");
                }

                var fileBytes = await _taxDeclarationService.DownloadDocumentByUrlAsync(url);
                if (fileBytes == null || fileBytes.Length == 0)
                {
                    return NotFound("File not found.");
                }

                var fileName = url.Split('/').Last();
                var fileContent = new FileContentResult(fileBytes, "application/octet-stream")
                {
                    FileDownloadName = fileName
                };

                return fileContent;
            }
            catch (Exception ex)
            {
                // Log the exception details (if needed)
                return StatusCode(500, "An error occurred while downloading the file.");
            }
        }
        //add from taxation

        [HttpPost]
        [Route("AddEmployeeRecord")]
        public async Task<IActionResult> AddEmployeeRecord(Employee12BBDTO employee12BBDTO)
        {
            // Validate the input

            if (employee12BBDTO == null)
            {
                return BadRequest("Invalid data.");
            }

            try
            {
                var result = await _taxDeclarationService.AddEmployeeRecordAsync(employee12BBDTO);
                if (result > 0)
                {
                    return Ok(result);
                }
                return BadRequest("Failed to insert employee record.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        // ManagetaxesList
        [HttpGet]
        [Route("GetManageTaxes12BB")]
        public async Task<IActionResult> GetManageTaxes12BB(int financialYearId, string? searchQuery, int? pageNumber, int? pageSize)
        {
            try
            {
                var result = await _taxDeclarationService.GetManageTaxes12BB(financialYearId, searchQuery, pageNumber, pageSize);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // for financial year
        [HttpGet]
        [Route("GetFinancialYears")]
        public async Task<IActionResult> GetFinancialYears()
        {
            try
            {
                var financialYears = await _taxDeclarationService.GetFinancialYearsAsync();
                if (financialYears == null || !financialYears.Any())
                {
                    return NotFound("No financial years found.");
                }
                return Ok(financialYears);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        // financial year 
        [HttpPost]
        [Route("AddLatestFinancialYear")]
        public async Task<IActionResult> AddLatestFinancialYear([FromBody] FinancialYearDTO financialYearDTO)
        {
            // Validate the input
            if (financialYearDTO == null)
            {
                return BadRequest("Invalid data.");
            }

            try
            {
                // Call the service to add a new financial year
                var result = await _taxDeclarationService.AddLatestFinancialYearAsync(financialYearDTO);

                if (result > 0) // Assuming result is the ID of the newly inserted record
                {
                    // Optionally, you can return the URL of the newly created resource
                    return CreatedAtAction(nameof(GetFinancialYearById), new { id = result }, result);
                }
                else
                {
                    return BadRequest("Failed to insert financial year.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception if necessary
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("GetFinancialYearbyId")]
        public async Task<IActionResult> GetFinancialYearById(int id)
        {
            var financialYear = await _taxDeclarationService.GetFinancialYearByIdAsync(id);
            if (financialYear == null)
            {
                return NotFound();
            }
            return Ok(financialYear);
        }



    }
}




