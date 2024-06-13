using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.Models;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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


        // get house rent
        [HttpGet]
        [Route("GetHouseRent/{id}")]
        public async Task<HouseRentRecordDTO> GetHouseRent(int id)
        {
            try
            {

                return await _taxDeclarationService.GetHouseRent(id);


                //if (result == null)
                //{
                //    throw new Exception("House rent record not found.");
                //}

                //return
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving the house rent record: {ex.Message}", ex);
            }
        }

        // GetLeaveTravelExpenditure
        [HttpGet]
        [Route("GetLeaveTravelExpenditure/{id}")]
        public async Task<TravelExpenditureDeclarationDTO> GetLeaveTravelExpenditure(int id)
        {
            try
            {

                var result = await _taxDeclarationService.GetLeaveTravelExpenditure(id);


                if (result == null)
                {
                    throw new Exception("Leave expenditure record not found.");
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving the leave record: {ex.Message}", ex);
            }
        }

        // get home loan
        [HttpGet]
        [Route("GetInterestPayableOnHomeLoan/{id}")]
        public async Task<HomeLoanRecordDTO> GetInterestPayableOnHome(int id)
        {
            try
            {

                var result = await _taxDeclarationService.GetInterestPayableOnHome(id);


                if (result == null)
                {
                    throw new Exception("home loan record not found.");
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving the home loan: {ex.Message}", ex);
            }

        }

        // get 80 C-Donations

        [HttpGet]
        [Route("GetEightyC/{id}")]
        public async Task<EightyCRecordDTO> GetEightyC(int id)
        {
            try
            {
                var result = await _taxDeclarationService.GetEightyC(id);


                if (result == null)
                {
                    throw new Exception("80 C record is not found");
                }
                return result;

            }
            catch (Exception ex)
            {

                throw new Exception($"An error occurred while retrieving 80 C: {ex.Message}", ex);

            }

        }

        // get 80 D

        [HttpGet]
        [Route("GetEightyD/{id}")]
        public async Task<EightyDRecordDTO> GetEightyD(int id)
        {
            try
            {

                var result = await _taxDeclarationService.GetEightyD(id);
                if (result == null)
                {
                    throw new Exception("80 D record is not found");
                }
                return result;

            }
            catch (Exception ex)
            {

                throw new Exception($"An error occurred while retrieving 80 D: {ex.Message}", ex);

            }

        }
        // get 80 G

        [HttpGet]
        [Route("GetEightyG/{id}")]
        public async Task<EightyGRecordDTO> GetEightyG(int id)
        {
            try
            {

                var result = await _taxDeclarationService.GetEightyG(id);
                if (result == null)
                {
                    throw new Exception("80 G record is not found");
                }
                return result;

            }
            catch (Exception ex)
            {

                throw new Exception($"An error occurred while retrieving 80 G: {ex.Message}", ex);

            }

        }
        //Other Investment

        [HttpGet]
        [Route("GetOtherInvestment/{id}")]
        public async Task<OtherInvestmentRecordDTO> GetOtherInvestment(int id)
        {
            try
            {

                var result = await _taxDeclarationService.GetOtherInvestment(id);
                if (result == null)
                {
                    throw new Exception("other declaration record is not found");
                }
                return result;

            }
            catch (Exception ex)
            {

                throw new Exception($"An error occurred while saving Leave Travel Expenditure: {ex.Message}", ex);

            }

        }

        // save house rent
        [HttpPost]
        [Route("HouseRent")]
        public async Task<HouseRentRecordDTO> SaveHouseRent([FromBody] HouseRentRecordDTO houseRentRecordDTO)
        {
            try
            {

                if (houseRentRecordDTO == null)
                {
                    throw new Exception(" Payload is invalid");
                }

                var result = await _taxDeclarationService.SaveHouseRent(houseRentRecordDTO);
                if (result == null)
                {
                    throw new Exception("unable to save");
                }
                return result;

            }
            catch (Exception ex)
            {

                throw new Exception($"An error occurred while saving House rent: {ex.Message}", ex);

            }

        }
        //leave travel 

        [HttpPost]
        [Route("LeaveTravelExpenditure")]
        public async Task<TravelExpenditureDeclarationDTO> SaveLeaveTravelExpenditure([FromBody] TravelExpenditureDeclarationDTO travelExpenditureDeclarationDTO)
        {
            try
            {

                if (travelExpenditureDeclarationDTO == null)
                {
                    throw new Exception(" Payload is invalid");
                }

                var result = await _taxDeclarationService.SaveLeaveTravelExpenditure(travelExpenditureDeclarationDTO);
                if (result == null)
                {
                    throw new Exception("unable to save");
                }
                return result;

            }
            catch (Exception ex)
            {

                throw new Exception($"An error occurred while saving Leave Travel Expenditure: {ex.Message}", ex);

            }

        }
        //interest Payable


        [HttpPost]
        [Route("InterestPayableOnHomeLoan")]
        public async Task<HomeLoanRecordDTO> SaveInterestPayableOnHome([FromBody] HomeLoanRecordDTO homeLoanRecordDTO)
        {
            try
            {

                if (homeLoanRecordDTO == null)
                {
                    throw new Exception(" Payload is invalid");
                }

                var result = await _taxDeclarationService.SaveInterestPayableOnHome(homeLoanRecordDTO);
                if (result == null)
                {
                    throw new Exception("unable to save");
                }
                return result;

            }
            catch (Exception ex)
            {

                throw new Exception($"An error occurred while saving Leave Travel Expenditure: {ex.Message}", ex);

            }

        }

        //80 C-Donations

        [HttpPost]
        [Route("EightyC")]
        public async Task<EightyCRecordDTO> SaveEightyC([FromBody] EightyCRecordDTO eightyCRecordDTO)
        {
            try
            {

                if (eightyCRecordDTO == null)
                {
                    throw new Exception(" Payload is invalid");
                }

                var result = await _taxDeclarationService.SaveEightyC(eightyCRecordDTO);
                if (result == null)
                {
                    throw new Exception("unable to save");
                }
                return result;

            }
            catch (Exception ex)
            {

                throw new Exception($"An error occurred while saving 80 C: {ex.Message}", ex);

            }

        }
        //80 D

        [HttpPost]
        [Route("EightyD")]
        public async Task<EightyDRecordDTO> SaveEightyD([FromBody] EightyDRecordDTO eightyDRecordDTO)
        {
            try
            {

                if (eightyDRecordDTO == null)
                {
                    throw new Exception(" Payload is invalid");
                }

                var result = await _taxDeclarationService.SaveEightyD(eightyDRecordDTO);
                if (result == null)
                {
                    throw new Exception("unable to save");
                }
                return result;

            }
            catch (Exception ex)
            {

                throw new Exception($"An error occurred while saving 80 D: {ex.Message}", ex);

            }

        }

        //80 G

        [HttpPost]
        [Route("EightyG")]
        public async Task<EightyGRecordDTO> SaveEightyG([FromBody] EightyGRecordDTO eightyGRecordDTO)
        {
            try
            {

                if (eightyGRecordDTO == null)
                {
                    throw new Exception(" Payload is invalid");
                }

                var result = await _taxDeclarationService.SaveEightyG(eightyGRecordDTO);
                if (result == null)
                {
                    throw new Exception("unable to save");
                }
                return result;

            }
            catch (Exception ex)
            {

                throw new Exception($"An error occurred while saving 80 G: {ex.Message}", ex);

            }

        }
        //Other Investment

        [HttpPost]
        [Route("OtherInvestment")]
        public async Task<OtherInvestmentRecordDTO> SaveOtherInvestment([FromBody] OtherInvestmentRecordDTO otherInvestmentRecordDTO)
        {
            try
            {

                if (otherInvestmentRecordDTO == null)
                {
                    throw new Exception(" Payload is invalid");
                }

                var result = await _taxDeclarationService.SaveOtherInvestment(otherInvestmentRecordDTO);
                if (result == null)
                {
                    throw new Exception("unable to save");
                }
                return result;

            }
            catch (Exception ex)
            {

                throw new Exception($"An error occurred while saving other investments: {ex.Message}", ex);

            }

        }

        //get Form 12BB
        [HttpGet]
        [Route("Employee12BB/{employeeId}/{financialYear}")]
        public async Task<IActionResult> GetEmployee12BB(string employeeId, string financialYear)
        {
            if (string.IsNullOrEmpty(employeeId) || string.IsNullOrEmpty(financialYear))
            {
                return BadRequest("EmployeeId and FinancialYear are required.");
            }

            var records = await _taxDeclarationService.GetEmployee12BB(employeeId, financialYear);

            
            if (records == null)
            {
                return NotFound("No records found.");
            }

            return Ok(records);
        }

        [HttpGet]
        [Route("Employee12BBs/{employeeId}")]
        public async Task<List<Employee12BB>> GetEmployee12BBs(string employeeId)
        {
            if (string.IsNullOrEmpty(employeeId))
            {
                throw new Exception("EmployeeId is required.");
            }
            var records = await _taxDeclarationService.GetEmployee12BBs(employeeId);
            if (records == null)
            {
                throw new Exception("No records found");
            }
            return records;
        }

        //save Form 12BB
        [HttpPost]
        [Route("SaveEmployee12BB")]
        public async Task<ActionResult<Employee12BB>> SaveEmployee12BB(string employeeId, [FromBody] Employee12BB employee12BB)
        {
            if (string.IsNullOrEmpty(employeeId))
            {
                return BadRequest("Employee ID is required.");
            }

            if (employee12BB == null)
            {
                return BadRequest("Employee12BB data is required.");
            }

            if (employeeId != employee12BB.EmployeeId)
            {
                return BadRequest("Employee ID mismatch.");
            }

            try
            {
                var savedEmployee12BB = await _taxDeclarationService.SaveEmployee12BB(employee12BB);

                return Ok(savedEmployee12BB);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "An error occurred while saving Employee12BB data.");
            }
        }

    }

}

