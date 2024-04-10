using KotiCRM.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.UserManagement
{
    public class CreateEmployeeDTO
    {
        // For employee
        public string? EmployeeId { get; set; }
        // public string? UserId { get; set; }
        public string? FatherName { get; set; }
        public string? EmployeeCode { get; set; }
        public int? DesignationId { get; set; }
        public int? DepartmentId { get; set; }
        public DateOnly? JoiningDate { get; set; }
        public DateOnly? RelievingDate { get; set; }
        public int? BankId { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public string? CorrespondenceAddress { get; set; }
        public string? PermanentAddress { get; set; }
        public string? PersonalEmailId { get; set; }
        public string? PanNumber { get; set; }
        public string? OfficialEmailId { get; set; }
        public string? SkypeId { get; set; }
        public int? StatusId { get; set; }
        public int CompanyId { get; set; }
        public string? AdharCardNumber { get; set; }
        public string? BloodGroup { get; set; }
        public int? ShiftId { get; set; }

        // For user
        public string? Name { get; set; }
        public string? ContactNumber1 { get; set; }
        public string? OfficialEmailPassword { get; set; }

    }
}
