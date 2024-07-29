    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace KotiCRM.Repository.Models
    {
        public  class FinancialYear
        {
            public int Id { get; set; }
            public string FinancialYearName { get; set; }
            public DateTime CreatedOn { get; set; }
            public string CreatedBy { get; set; }
            public bool IsActive { get; set; }

        }
    }
