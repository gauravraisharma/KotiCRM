using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class ProcessedFile
{
    public int Id { get; set; }

    public string? Filename { get; set; }

    public int? Status { get; set; }
}
