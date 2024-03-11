using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class Organization
{
    public int Id { get; set; }

    public string? OrgName { get; set; }

    public bool? IsActive { get; set; }

    public string? TimeZone { get; set; }

    public bool? Shifts { get; set; }

    public bool? IncludeLogofToIdle { get; set; }

    public string? Currency { get; set; }

    public virtual ICollection<Department> Departments { get; set; } = new List<Department>();

    public virtual ICollection<Designation> Designations { get; set; } = new List<Designation>();

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
