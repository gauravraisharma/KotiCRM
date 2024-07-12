using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.IRepository
{

    public interface ITaxDeclarationRepository
    {
        
        //form 12
        Task<Employee12BBDTO> GetEmployee12BB(string employeeId);
        Task<List<Employee12BB>> GetEmployee12BBs(string employeeId);

        Task<Employee12BB> SaveEmployee12BB(Employee12BB employee12BB);
        Task<List<DocumentPaths>> UploadDocumentProofs(IFormCollection formCollection);
        Task<int> InsertEmployeeRecordAsync(Employee12BBDTO employee12BBDTO);
        Task<List<ManageTaxes12BBDTO>> GetManageTaxes12BB(string? searchQuery, int? pageNumber, int? pageSize);
    }

}

