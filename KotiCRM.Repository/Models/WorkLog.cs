using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class WorkLog
{
    public int Id { get; set; }

    public string EmployeeCode { get; set; } = null!;

    public DateOnly Date { get; set; }

    public double HoursWorked { get; set; }

    public double HoursIdle { get; set; }

    public double ActualWork { get; set; }

    public int ImportHistoryId { get; set; }

    public double ManualTime { get; set; }
}
