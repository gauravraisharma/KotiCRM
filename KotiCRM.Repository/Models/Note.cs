using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class Note
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public int UserID { get; set; }
        public DateTime DateOfNote { get; set; }
        public string Description { get; set; }
    }
}
