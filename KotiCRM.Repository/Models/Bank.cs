using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class Bank
{
    public int BankId { get; set; }

    public string? Name { get; set; }

    public string? Branch { get; set; }

    public string? Ifsc { get; set; }

    public int? OrganizationId { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
