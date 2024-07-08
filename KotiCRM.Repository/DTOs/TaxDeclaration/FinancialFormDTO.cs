using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.TaxDeclaration
{
    public class FinancialFormDTO
    {
        public int Id { get; set; }
        public string Year { get; set; }
        public bool SubmittedProofs { get; set; }
        public DateTime? LastSubmittedDate { get; set; }
    }
    public class Form16DTO
    {
        public string Year { get; set; }
        public string DownloadLink { get; set; }
    }
}
