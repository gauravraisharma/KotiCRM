using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class TimeLog
{
    public long Id { get; set; }

    public DateTime? LoginTime { get; set; }

    public DateTime? LogoutTime { get; set; }

    public string? EmpCode { get; set; }
}
