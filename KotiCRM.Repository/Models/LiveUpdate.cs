using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class LiveUpdate
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateOnly DateOfEntry { get; set; }

    public bool Status { get; set; }
}
