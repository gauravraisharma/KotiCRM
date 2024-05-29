using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class EightyGDeclaration
    {
        public int Id { get; set; }
        public string NameOfDonee { get; set; }
        public string PanNumber { get; set; }
        public string Address { get; set; }
        public int Amount { get; set; }
        public string ProofDocumentLink { get; set; }
        public bool IsVerified { get; set; }
        public string Remarks { get; set; }
    }
}
