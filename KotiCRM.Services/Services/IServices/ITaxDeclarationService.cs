using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.IServices
{
    public interface ITaxDeclarationService
    {
        // Get 
        Task<Employee12BBDTO> GetEmployee12BB(string employeeId);
        Task<List<Employee12BB>> GetEmployee12BBs(string employeeId);

        //save 
        Task<Employee12BB> SaveEmployee12BB(Employee12BB employee12BB);
        // document 
        Task<List<DocumentPaths>> UploadDocumentProofs(IFormCollection formCollection);


        Task<int> AddEmployeeRecordAsync(Employee12BBDTO employee12BBDTO);
        Task<List<ManageTaxes12BBDTO>> GetManageTaxes12BB(int financialYearId, string? searchQuery, int? pageNumber, int? pageSize);
        Task<List<FinancialYearDTO>> GetFinancialYearsAsync();
        Task<int> AddLatestFinancialYearAsync(FinancialYearDTO financialYearDTO);
        //Task<int> AddFinancialYearAsync(FinancialYearDTO financialYearDTO);
        Task<FinancialYearDTO> GetFinancialYearByIdAsync(int id);
        Task<byte[]> DownloadDocumentByUrlAsync(string url);
    



























    //Task SaveDeclaration(TaxDeclarationDTO taxDeclarationDTO);

    //void SaveTaxDeclaration(TaxDeclarationDTO taxDeclaration);

    ////list
    //IEnumerable<FinancialFormDTO> GetAllFinancialForms();
    //FinancialFormDTO GetFinancialFormById(int id);
    //void AddFinancialForm(FinancialFormDTO form);
    //void UpdateFinancialForm(FinancialFormDTO form);
    //void DeleteFinancialForm(int id);

    //IEnumerable<Form16DTO> GetAllForm16s();
    //Form16DTO GetForm16ByYear(string year);
    //void AddForm16(Form16DTO form);
    //void UpdateForm16(Form16DTO form);
    //void DeleteForm16(string year);
}
}
