using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class Designation
{
    public int DesignationId { get; set; }

    public string? Name { get; set; }

    public int? OrganizationId { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    public virtual Organization? Organization { get; set; }
}
