using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KotiCRM.Repository.Models;

public partial class Task
{
    [Key]
    public int TaskId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public bool? Status { get; set; }

    public int? ProjectId { get; set; }

    public virtual Project? Project { get; set; }
}
