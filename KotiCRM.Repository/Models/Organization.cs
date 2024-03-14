using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KotiCRM.Repository.Models;

public partial class Organization
{
    [Key]
    public int Id { get; set; }

    public string? OrgName { get; set; }

    public bool? IsActive { get; set; }

    public string? TimeZone { get; set; }

    public bool? Shifts { get; set; }

    public bool? IncludeLogofToIdle { get; set; }

    public string? Currency { get; set; }
    [Column(TypeName = "nvarchar(100)")]
    public string ? BillingStreet { get; set; }
    [Column(TypeName = "nvarchar(100)")]
    public string? BillingCity { get; set; }
    [Column(TypeName = "nvarchar(100)")]
    public string? BillingState { get; set; }
    [Column(TypeName = "nvarchar(100)")]
    public string? BillingCode {  get; set; }
    [Column(TypeName = "nvarchar(100)")]
    public string? BillingCountry { get; set; }

    public virtual ICollection<Department> Departments { get; set; } = new List<Department>();

    public virtual ICollection<Designation> Designations { get; set; } = new List<Designation>();

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
