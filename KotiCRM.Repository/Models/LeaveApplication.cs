using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class LeaveApplication
{
    public int Id { get; set; }

    public int? EmployeeLeaves { get; set; }

    public string? EmpCodeAppliedToName { get; set; }

    public string? EmpCodeAppliedTo { get; set; }

    public string? EmpCodeAppliedByName { get; set; }

    public string EmpCodeAppliedBy { get; set; } = null!;

    public int TypeOfLeave { get; set; }

    public int? FkEmployeeLeavesId { get; set; }
}
