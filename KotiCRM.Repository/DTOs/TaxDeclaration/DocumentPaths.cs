using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.DTOs.TaxDeclaration
{
    public class DocumentPaths
    {
        public int FileIndex { get; set; }
        public string Section { get; set; }
        public string FieldName { get; set; }
        public string FullPath { get; set; }
    }
}
