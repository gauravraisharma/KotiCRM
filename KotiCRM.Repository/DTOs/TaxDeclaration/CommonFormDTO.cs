using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.TaxDeclaration
{
    public class CommonFormDTO
    {
        public int EmployeeId { get; set; }
        public string FinancialYear { get; set; }
        public decimal Amount { get; set; }  
        public string PAN { get; set; }
        public string Address { get; set; }
    }
}
