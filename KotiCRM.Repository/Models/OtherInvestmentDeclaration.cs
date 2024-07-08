using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class OtherInvestmentDeclaration
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public string? ProofDocumentLink { get; set; }
        public bool IsVerified { get; set; }
        public string? Remarks { get; set; }
    }
}
