using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class TaskMember
{
    public int Id { get; set; }

    public int? TaskId { get; set; }

    public string? EmpCode { get; set; }

    public bool? IsManager { get; set; }

    public int Status { get; set; }
}
