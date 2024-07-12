using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public  class FinancialYear
    {
        public int Id { get; set; }
        public string Financialyear { get; set; }
        public int Employee12BBId { get; set; }
        public string? EmployeeId { get; set; }
        public string CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public bool IsActive { get; set; }
    
    }
}
