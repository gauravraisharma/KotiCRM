using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class DefaultColumn
{
    public int Id { get; set; }

    public string? ColumnName { get; set; }

    public string? Entity { get; set; }

    public int? OrgId { get; set; }

    public bool? IsEditable { get; set; }
}
