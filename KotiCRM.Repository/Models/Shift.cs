using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class Shift
{
    public int ShiftId { get; set; }

    public string? Name { get; set; }

    public TimeOnly? StartTime { get; set; }

    public TimeOnly? EndTime { get; set; }

    public int? OrganizationId { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
