using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class Employee
{
    public string EmployeeId { get; set; } = null!;

    public string? Name { get; set; }

    public string? EmpCode { get; set; }

    public int? DesignationId { get; set; }

    public int? DepartmentId { get; set; }

    public DateOnly? JoiningDate { get; set; }

    public DateOnly? RelievingDate { get; set; }

    public string? BankAccountNumber { get; set; }

    public int? BankId { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public string? ContactNumber1 { get; set; }

    public string? ContactNumber2 { get; set; }

    public string? FatherName { get; set; }

    public string? CorrespondenceAddress { get; set; }

    public string? PermanentAddress { get; set; }

    public string? PersonalEmailId { get; set; }

    public string? PanNumber { get; set; }

    public string? OfficialEmailId { get; set; }

    public string? SkypeId { get; set; }

    public int? Status { get; set; }

    public string? Password { get; set; }

    public int RoleId { get; set; }

    public int CompanyId { get; set; }

    public string? Ifsccode { get; set; }

    public string? AdharCardNumber { get; set; }

    public string? OfficialEmailPassword { get; set; }

    public string? BloodGroup { get; set; }

    public int? OrganizationId { get; set; }

    public string? Id { get; set; }

    public int? ShiftId { get; set; }

    public virtual Bank? Bank { get; set; }

    public virtual Company Company { get; set; } = null!;

    public virtual Department? Department { get; set; }

    public virtual Designation? Designation { get; set; }

    public virtual Organization? Organization { get; set; }

    public virtual EmployeeRole Role { get; set; } = null!;

    public virtual Shift? Shift { get; set; }

    public virtual ICollection<UserLeave> UserLeaves { get; set; } = new List<UserLeave>();
}
