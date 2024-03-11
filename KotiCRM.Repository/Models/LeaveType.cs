using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class LeaveType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
}
