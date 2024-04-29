using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.UserManagement
{
    public class GetEmployeesDTO
    {
        public string? UserId { get; set; }
        public string? EmployeeId { get; set; }
        public string? EmployeeCode { get; set; }
        public string? Name { get; set; }
        public string? OfficialEmail { get; set; }
        public string? ContactNumber1 { get; set; }
        public DateOnly? JoiningDate { get; set; }
        public string? Department { get; set; }
        public string? Designation { get; set; }
        public string? Shift { get; set; }
        public int? DepartmentId { get; internal set; }
        public string? BloodGroup { get; set; }
        public DateOnly? BirthDate {  get; set; }
    }
}
