using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Repository.Repository;
using KotiCRM.Services.IServices;
using System;
using System.Threading.Tasks;

namespace KotiCRM.Services.Services
{
    public class TaxDeclarationService : ITaxDeclarationService
    {
        private readonly ITaxDeclarationRepository _taxDeclarationRepository;

        // save
        public TaxDeclarationService(ITaxDeclarationRepository taxDeclarationRepository)
        {
            _taxDeclarationRepository = taxDeclarationRepository;
        }

        public async Task<HouseRentRecordDTO> SaveHouseRent(HouseRentRecordDTO houseRentRecordDTO)
        {
            return await _taxDeclarationRepository.SaveHouseRent(houseRentRecordDTO);

        }
        public async Task<TravelExpenditureDeclarationDTO> SaveLeaveTravelExpenditure(TravelExpenditureDeclarationDTO travelExpenditureDeclarationDTO)
        {
            return await _taxDeclarationRepository.SaveLeaveTravelExpenditure(travelExpenditureDeclarationDTO);

        }
        public async Task<HomeLoanRecordDTO> SaveInterestPayableOnHome(HomeLoanRecordDTO homeLoanRecordDTO)
        {
            return await _taxDeclarationRepository.SaveInterestPayableOnHome(homeLoanRecordDTO);

        }
        public async Task<EightyCRecordDTO> SaveEightyC(EightyCRecordDTO eightyCRecordDTO)
        {
            return await _taxDeclarationRepository.SaveEightyC(eightyCRecordDTO);

        }
        public async Task<EightyDRecordDTO> SaveEightyD(EightyDRecordDTO eightyDRecordDTO)
        {
            return await _taxDeclarationRepository.SaveEightyD(eightyDRecordDTO);

        }
        public async Task<EightyGRecordDTO> SaveEightyG(EightyGRecordDTO eightyGRecordDTO)
        {
            return await _taxDeclarationRepository.SaveEightyG(eightyGRecordDTO);

        }
        public async Task<OtherInvestmentRecordDTO> SaveOtherInvestment(OtherInvestmentRecordDTO otherInvestmentRecordDTO)
        {
            return await _taxDeclarationRepository.SaveOtherInvestment(otherInvestmentRecordDTO);

        }
        // Get 
        public async Task<HouseRentRecordDTO> GetHouseRent(int id)
        {
            return await _taxDeclarationRepository.GetHouseRent(id);

        }
        public async Task<TravelExpenditureDeclarationDTO> GetLeaveTravelExpenditure(int id)
        {
            return await _taxDeclarationRepository.GetLeaveTravelExpenditure(id);

        }
        public async Task<HomeLoanRecordDTO> GetInterestPayableOnHome(int id)
        {
            return await _taxDeclarationRepository.GetInterestPayableOnHome(id);

        }
        public async Task<EightyCRecordDTO> GetEightyC(int id)
        {
            return await _taxDeclarationRepository.GetEightyC(id);

        }
        public async Task<EightyDRecordDTO> GetEightyD(int id)
        {
            return await _taxDeclarationRepository.GetEightyD(id);

        }
        public async Task<EightyGRecordDTO> GetEightyG(int id)
        {
            return await _taxDeclarationRepository.GetEightyG(id);

        }
        public async Task<OtherInvestmentRecordDTO> GetOtherInvestment(int id)
        {
            return await _taxDeclarationRepository.GetOtherInvestment(id);

        }
        public async Task<Employee12BB> GetEmployee12BB(string employeeId, string financialYear)
        {

            return await _taxDeclarationRepository.GetEmployee12BB(employeeId, financialYear);
        }
        public async Task<List<Employee12BB>> GetEmployee12BBs(string employeeId)
        {

            return await _taxDeclarationRepository.GetEmployee12BBs(employeeId);
        }
        public async Task<Employee12BB> SaveEmployee12BB(Employee12BB employee12BB)
        {
            return await _taxDeclarationRepository.SaveEmployee12BB(employee12BB);

        }

    }
}



















