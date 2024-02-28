using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class Attachment
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public DateTime DateAdded { get; set; }
        public double SizeMb { get; set; }
        public string FileName { get; set; }
    }
}
