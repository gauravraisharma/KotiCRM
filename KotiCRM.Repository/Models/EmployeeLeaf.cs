using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class EmployeeLeaf
{
    public int Id { get; set; }

    public string EmpCode { get; set; } = null!;

    public string EmpCodeAppliedByName { get; set; } = null!;

    public int TypeOfLeave { get; set; }

    public DateOnly? FromDate { get; set; }

    public DateOnly? ToDate { get; set; }

    public int? Status { get; set; }

    public string Description { get; set; } = null!;

    public string? ApprovedByEmpCode { get; set; }

    public string? RejectedByEmpCode { get; set; }
}
