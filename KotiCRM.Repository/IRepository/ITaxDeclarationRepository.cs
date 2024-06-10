using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.IRepository
{

    public interface ITaxDeclarationRepository
    {
        //save
        Task<HouseRentRecordDTO> SaveHouseRent(HouseRentRecordDTO houseRentRecordDTO);
        Task<TravelExpenditureDeclarationDTO> SaveLeaveTravelExpenditure(TravelExpenditureDeclarationDTO travelExpenditureDeclarationDTO);
        Task<HomeLoanRecordDTO> SaveInterestPayableOnHome(HomeLoanRecordDTO homeLoanRecordDTO);
        Task<EightyCRecordDTO> SaveEightyC(EightyCRecordDTO eightyCRecordDTO);
        Task<EightyDRecordDTO> SaveEightyD(EightyDRecordDTO eightyDRecordDTO);
        Task<EightyGRecordDTO> SaveEightyG(EightyGRecordDTO eightyGRecordDTO);
        Task<OtherInvestmentRecordDTO> SaveOtherInvestment(OtherInvestmentRecordDTO otherInvestmentRecordDTO);

        //Get
        Task<HouseRentRecordDTO> GetHouseRent(int id);
        Task<TravelExpenditureDeclarationDTO> GetLeaveTravelExpenditure(int id);
        Task<HomeLoanRecordDTO> GetInterestPayableOnHome(int id);
        Task<EightyCRecordDTO> GetEightyC(int id);
        Task<EightyDRecordDTO> GetEightyD(int id);
        Task<EightyGRecordDTO> GetEightyG(int id);
        Task<OtherInvestmentRecordDTO> GetOtherInvestment(int id);

        //form 12
        Task<Employee12BB> GetEmployee12BB(string employeeId, string financialYear);
        Task<List<Employee12BB>> GetEmployee12BBs(string employeeId);

        Task<Employee12BB> SaveEmployee12BB(Employee12BB employee12BB);













    }
}















        //Task SaveTaxDeclaration(TaxDeclarationDTO taxDeclarationDTO);

        //List form
        // IEnumerable<FinancialFormDTO> GetAllFinancialForms();
        //FinancialFormDTO GetFinancialFormById(int id);
        //void AddFinancialForm(FinancialFormDTO form);
        //void UpdateFinancialForm(FinancialFormDTO form);
        //void DeleteFinancialForm(int id);

        //IEnumerable<Form16DTO> GetAllForm16s();
        //Form16DTO GetForm16ByYear(string year);
        //void AddForm16(Form16DTO form);
        //void UpdateForm16(Form16DTO form);
        //void DeleteForm16(string year);
    //}
//}
