using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class Employee : BaseEntity
{
    public string? EmployeeId { get; set; }
    public string? EmpCode { get; set; }
    public string? UserId { get; set; }
    public string? Name { get; set; }
    public string? ProfilePictureURL { get; set; }
    public string? FatherName { get; set; }
    public string? GuardianName { get; set; }
    public string? BloodGroup { get; set; }
    public DateOnly? DateOfBirth { get; set; }
    public DateOnly? JoiningDate { get; set; }
    public DateOnly? RelievingDate { get; set; }
    public string? ContactNumber1 { get; set; }
    public string? ContactNumber2 { get; set; }
    public string? GuardianContactNumber { get; set; }
    public string? PersonalEmailId { get; set; }
    public string? OfficialEmailId { get; set; }
    public string? OfficialEmailPassword { get; set; }
    public string? SkypeId { get; set; }
    public string? AdharCardNumber { get; set; }
    public string? PanNumber { get; set; }
    public int? DepartmentId { get; set; }
    public int? DesignationId { get; set; }
    public int CompanyId { get; set; }
    public int? BankId { get; set; }
    public int? ShiftId { get; set; }
    public string? PermanentAddress { get; set; }
    public string? CorrespondenceAddress { get; set; }
    public virtual Company? Company { get; set; }
    public virtual Department? Department { get; set; }
    public virtual Designation? Designation { get; set; }
    public virtual Shift? Shift { get; set; }
    public virtual Bank? Bank { get; set; }
    //public string CreatedBy { get; set; }
    public virtual ICollection<Employee12BB> Employee12BBs { get; set; }

}
