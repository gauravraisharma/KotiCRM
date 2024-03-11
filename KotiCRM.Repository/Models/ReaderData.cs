using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class ReaderData
{
    public int Id { get; set; }

    public DateTime? ReadingData { get; set; }

    public string? EmployeeId { get; set; }
}
