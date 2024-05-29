using KotiCRM.Repository.DTOs.TaxDeclaration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.IRepository
{
    public interface ITaxationRepository
    {
        void Save(TaxDeclarationDTO taxDeclaration);
        TaxDeclarationDTO Get(int id);
    }
}
