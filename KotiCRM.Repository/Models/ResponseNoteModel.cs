using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class ResponseNoteModel
    {
        public int ID { get; set; }
 
        public int AccountID { get; set; }
        public string UserID { get; set; }
        public DateTime DateOfNote { get; set; }
        public string Description { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
