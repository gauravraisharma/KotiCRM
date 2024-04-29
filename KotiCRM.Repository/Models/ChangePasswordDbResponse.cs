using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public  class ChangePasswordDbResponse
    {
        public int status { get; set; }
        public string Message  { get; set; }
        public string Email  { get; set; }
    }
}
