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
        
        //form 12
        Task<Employee12BB> GetEmployee12BB(string employeeId, string financialYear);
        Task<List<Employee12BB>> GetEmployee12BBs(string employeeId);

        Task<Employee12BB> SaveEmployee12BB(Employee12BB employee12BB);

    }
}
