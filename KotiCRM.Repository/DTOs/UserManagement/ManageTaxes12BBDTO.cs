using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.UserManagement
{
    public  class ManageTaxes12BBDTO
    {

        public string? EmployeeId { get; set; }
        public string? EmpCode { get; set; }
        public string? Name { get; set; }
        public string? ContactNumber { get; set; }
        public string? Email { get; set; }
        public bool IsDeclarationComplete { get; set; }
        public DateTime? SubmittedOn { get; set; }
        public int UserCount { get; set; }

        public int FinancialYearId { get; set; }
    }
}
