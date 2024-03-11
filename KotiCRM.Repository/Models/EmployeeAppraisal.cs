using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class EmployeeAppraisal
{
    public int Id { get; set; }

    public string? EmpCode { get; set; }

    public int? CurrentDesignation { get; set; }

    public int? NewDesignation { get; set; }

    public int? CurrentSalary { get; set; }

    public int? NewSalary { get; set; }

    public DateTime? AppraisalDate { get; set; }
}
