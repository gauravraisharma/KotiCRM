using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class UserLeave
{
    public int LeaveId { get; set; }

    public string? EmployeeId { get; set; }

    public string? ReasonForLeave { get; set; }

    public int? LeaveType { get; set; }

    public string? LeaveApproval { get; set; }

    public DateOnly? StartLeave { get; set; }

    public DateOnly? EndLeave { get; set; }

    public bool? IsApproved { get; set; }

    public virtual Employee? Employee { get; set; }
}
