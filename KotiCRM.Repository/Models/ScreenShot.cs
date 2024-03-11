using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class ScreenShot
{
    public long Id { get; set; }

    public byte[]? ImageData { get; set; }

    public string? EmpCode { get; set; }

    public DateTime? DateOfScreenshot { get; set; }

    public int? IsIdleTime { get; set; }

    public int? TaskId { get; set; }

    public int? KeyStrokes { get; set; }

    public int? MouseStrokes { get; set; }

    public string? ManualTime { get; set; }

    public int? OrganizationId { get; set; }

    public string? ImageName { get; set; }

    public string? WindowTitles { get; set; }
}
