using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class DbResponse
    {
        public bool Succeed { get; set; }

        public string Message { get; set; }

        public string ErrorCode { get; set; }

        public DbResponse() { }

        public DbResponse(bool succeed) : this()
        {
            Succeed = succeed;
        }

        public DbResponse(bool succeed, string message) : this(succeed)
        {
            Message = message;
        }

        public DbResponse(bool succeed, string message, string errorCode) : this(succeed, message)
        {
            ErrorCode = errorCode;
        }
    }
}

