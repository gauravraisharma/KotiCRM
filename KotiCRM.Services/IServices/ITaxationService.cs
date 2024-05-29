using KotiCRM.Repository.DTOs.TaxDeclaration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.IServices
{
    public interface ITaxationService
    {
        void SaveTaxDeclaration(TaxDeclarationDTO taxDeclarationDTO);
        TaxDeclarationDTO GetTaxDeclarationById(int id);
    }
}
