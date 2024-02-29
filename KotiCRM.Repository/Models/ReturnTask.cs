using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Models
{
    public class ReturnTask
    {
        public bool Succeed { get; set; }

        public string Message { get; set; }

        public string ErrorCode { get; set; }

        public ReturnTask() { }

        public ReturnTask(bool succeed) : this()
        {
            Succeed = succeed;
        }

        public ReturnTask(bool succeed, string message) : this(succeed)
        {
            Message = message;
        }

        public ReturnTask(bool succeed, string message, string errorCode) : this(succeed, message)
        {
            ErrorCode = errorCode;
        }
    }
}

