using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class ProjectTimesheetInterval
{
    public int TimesheetIntervalId { get; set; }

    public string? TimesheetType { get; set; }

    public int? OrganizationId { get; set; }
}
