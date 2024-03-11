using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class Timesheet
{
    public int Id { get; set; }

    public DateOnly? TimesheetStartDate { get; set; }

    public DateOnly? TimesheetEndDate { get; set; }

    public int? Status { get; set; }

    public int? TimesheetInterval { get; set; }

    public int? HoursConsumed { get; set; }

    public decimal? BudgetConsumed { get; set; }

    public int? ProjectId { get; set; }

    public string? EmpCode { get; set; }
}
