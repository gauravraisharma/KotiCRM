using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class ProjectStatus
{
    public int StatusId { get; set; }

    public string? StatusType { get; set; }

    public int? OrganizationId { get; set; }
}
