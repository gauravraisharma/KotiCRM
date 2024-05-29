using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class TravelExpenditureDeclaration
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public string ProofDocumentLink { get; set; }
        public bool IsVerified { get; set; }
        public string Remarks { get; set; }
    }
}
