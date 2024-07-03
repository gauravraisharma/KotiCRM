using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using KotiCRM.Repository.Repository;
using KotiCRM.Services.IServices;
using Microsoft.AspNetCore.Http;
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
        public async Task<Employee12BBDTO> GetEmployee12BB(string employeeId, string financialYear)
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

        public async Task<bool> UploadDocumentProofs(IFormCollection formCollection)
        {
            return await _taxDeclarationRepository.UploadDocumentProofs(formCollection);
        }
        public async Task<int> AddEmployeeRecordAsync(Employee12BBDTO employee12BBDTO)
        {
            return await _taxDeclarationRepository.InsertEmployeeRecordAsync(employee12BBDTO);
        }

    }
}



















