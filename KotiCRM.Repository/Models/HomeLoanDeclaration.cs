using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class HomeLoanDeclaration
    {
        public int Id { get; set; }
        public string? LenderName { get; set; }
        public string? LenderAddress { get; set; }
        public string? LenderPanNumber { get; set; }
        public int? Amount { get; set; }
        public string? ProofDocumentLink { get; set; }
        public bool IsVerified { get; set; }
        public string? Remarks { get; set; }
    }
}
