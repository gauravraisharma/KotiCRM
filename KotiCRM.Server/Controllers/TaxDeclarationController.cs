using KotiCRM.Repository.Constants;
using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using System.Net.Http.Headers;

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
        [Route("Employee12BB/{employeeId}/{financialYear}")]
        public async Task<Employee12BBDTO> GetEmployee12BB(string employeeId, string financialYear)
        {
            if (string.IsNullOrEmpty(employeeId) || string.IsNullOrEmpty(financialYear))
            {
                throw new Exception("EmployeeId and FinancialYear are required.");
            }

            // Fetch the records from the service

            var records = await _taxDeclarationService.GetEmployee12BB(employeeId, financialYear);
            if (records == null)
            {
                throw new Exception("No records found.");
            }
            return records;
        }

        // Endpoint to get all Form 12BB records for a specific employee
        [HttpGet]
        [Route("Employee12BBs/{employeeId}")]
        public async Task<List<Employee12BB>> GetEmployee12BBs(string employeeId)
        {
            if (string.IsNullOrEmpty(employeeId))
            {
                throw new Exception("EmployeeId is required.");
            }
            // Fetch the records from the service
            var records = await _taxDeclarationService.GetEmployee12BBs(employeeId);
            if (records == null)
            {
                throw new Exception("No records found");
            }
            return records;
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
    }
}



