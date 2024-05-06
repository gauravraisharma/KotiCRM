using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.UserManagement
{
    public class CreateEmployeeDTO
    {
        public string? EmployeeId { get; set; }
        public string? EmployeeCode { get; set; }
        public string? Name { get; set; }
        public IFormFile? ProfilePicture { get; set; }
        public string? ProfilePicturePath { get; set; }
        public string? FatherName { get; set; }
        public string? GuardianName { get; set; }
        public string? BloodGroup { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public DateOnly? JoiningDate { get; set; }
        public DateOnly? RelievingDate { get; set; }
        public string? ContactNumber { get; set; }     
        public string? GuardianContactNumber { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? SkypeId { get; set; }
        public string? AdharCardNumber { get; set; }
        public string? PanNumber { get; set; }
        public string? BankAccountNumber { get; set; }
        public string? Bank { get; set; }  
        public string? Branch { get; set; }
        public string? Ifsc { get; set; }
        public int? DepartmentId { get; set; }
        public int? DesignationId { get; set; }
        public string? RoleId { get; set; }
        public int? ShiftId { get; set; }
        public bool IsActive { get; set; }
        public string? PermanentAddress { get; set; }
        public string? CorrespondenceAddress { get; set; }

        // Add property for profile picture
        //public IFormFile ProfilePicture { get; set; }

        // public int CompanyId { get; set; }
        // public int organizationID { get; set; }
        // public int? StatusId { get; set; }
        // public int? BankId { get; set; }
    }
}
