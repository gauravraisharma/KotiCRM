using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class ProjectTeam
{
    public int MemeberId { get; set; }

    public string EmpCode { get; set; } = null!;

    public int ProjectId { get; set; }

    public bool? IsManager { get; set; }

    public bool? IsActive { get; set; }

    public int? HourlyRate { get; set; }

    public virtual Project Project { get; set; } = null!;
}
