using KotiCRM.Repository.DTOs.TaxDeclaration;
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
        Task<Employee12BBDTO> GetEmployee12BB(string employeeId, string financialYear);
        Task<List<Employee12BB>> GetEmployee12BBs(string employeeId);

        Task<Employee12BB> SaveEmployee12BB(Employee12BB employee12BB);
        Task<bool> UploadDocumentProofs(IFormCollection formCollection);
        Task<int> InsertEmployeeRecordAsync(Employee12BBDTO employeeRecordDto);

    }
}
