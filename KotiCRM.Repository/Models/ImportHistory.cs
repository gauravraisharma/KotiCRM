using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class ImportHistory
{
    public int Id { get; set; }

    public string EmpCode { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public DateOnly ImportedDataDate { get; set; }
}
