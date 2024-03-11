using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class Project
{
    public int ProjectId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public int? Status { get; set; }

    public decimal? EstimatedBudget { get; set; }

    public int? EstimatedHours { get; set; }

    public int? TimeSheetInterval { get; set; }

    public int? OrganizationId { get; set; }

    public virtual ICollection<ProjectTeam> ProjectTeams { get; set; } = new List<ProjectTeam>();

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
