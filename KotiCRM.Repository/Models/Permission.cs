using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class Permission
{
    public int PermissionId { get; set; }

    public bool Edit { get; set; }

    public bool View { get; set; }

    public bool Add { get; set; }

    public bool Delete { get; set; }

    public int ModuleId { get; set; }

    public string RoleId { get; set; } = null!;
}
