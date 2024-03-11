using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class LeaveNotification
{
    public int Id { get; set; }

    public string AppliedDate { get; set; } = null!;

    public string AppliedTime { get; set; } = null!;

    public string SentByEmpCode { get; set; } = null!;

    public string SentByName { get; set; } = null!;

    public string SentToEmpCode { get; set; } = null!;

    public string SentToName { get; set; } = null!;

    public int Viewed { get; set; }

    public string? AdminNotificationDescription { get; set; }

    public string? ApplierNotificationDescription { get; set; }

    public string? ManagerNotificationDescription { get; set; }

    public int? IsManager { get; set; }
}
