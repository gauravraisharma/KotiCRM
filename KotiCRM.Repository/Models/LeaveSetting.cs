using System;
using System.Collections.Generic;

namespace KotiCRM.Repository.Models;

public partial class LeaveSetting
{
    public int Id { get; set; }

    public int Year { get; set; }

    public int TypeOfLeave { get; set; }

    public int NumberOfLeaves { get; set; }
}
