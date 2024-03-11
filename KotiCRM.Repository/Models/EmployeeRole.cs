using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class EmployeeRole
{
    public int RoleId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
