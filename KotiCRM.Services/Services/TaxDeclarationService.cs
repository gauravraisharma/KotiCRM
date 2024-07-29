using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Repository.Repository;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
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
        public async Task<Employee12BBDTO> GetEmployee12BB(string employeeId)
        {

            return await _taxDeclarationRepository.GetEmployee12BB(employeeId);
        }
        public async Task<List<Employee12BB>> GetEmployee12BBs(string employeeId)
        {

            return await _taxDeclarationRepository.GetEmployee12BBs(employeeId);
        }
        public async Task<Employee12BB> SaveEmployee12BB(Employee12BB employee12BB)
        {
            return await _taxDeclarationRepository.SaveEmployee12BB(employee12BB);

        }

        public async Task<List<DocumentPaths>> UploadDocumentProofs(IFormCollection formCollection)
        {
            return await _taxDeclarationRepository.UploadDocumentProofs(formCollection);
        }

        public async Task<int> AddEmployeeRecordAsync(Employee12BBDTO employee12BBDTO)
        {
            return await _taxDeclarationRepository.InsertEmployeeRecordAsync(employee12BBDTO);
        }
        public async Task<List<ManageTaxes12BBDTO>> GetManageTaxes12BB(int financialYearId, string? searchQuery, int? pageNumber, int? pageSize)
        {

            return await _taxDeclarationRepository.GetManageTaxes12BB(financialYearId, searchQuery, pageNumber, pageSize);

        }
        public Task<int> AddLatestFinancialYearAsync(FinancialYearDTO financialYearDTO)
        {
            return _taxDeclarationRepository.AddLatestFinancialYearAsync(financialYearDTO);
        }

        public async Task<FinancialYearDTO> GetFinancialYearByIdAsync(int id)
        {
            return await _taxDeclarationRepository.GetFinancialYearByIdAsync(id);
        }

        public async Task<List<FinancialYearDTO>> GetFinancialYearsAsync()
        {
            return await _taxDeclarationRepository.GetFinancialYearsAsync();
        }
        public async Task<byte[]> DownloadDocumentByUrlAsync(string url)
        {
            return await _taxDeclarationRepository.DownloadDocumentByUrlAsync(url);
        }
    }

}



















