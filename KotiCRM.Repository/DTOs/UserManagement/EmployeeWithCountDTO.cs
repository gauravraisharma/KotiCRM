using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.UserManagement
{
    public class EmployeeWithCountDTO
    {
        public int UserCount { get; set; }
        public IEnumerable<GetEmployeesDTO> Employee { get; set; }
    }
}
