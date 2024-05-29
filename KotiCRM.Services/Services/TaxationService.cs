using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.IRepository;
using KotiCRM.Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Services.Services
{
    public class TaxationService:ITaxationService
    {
        private readonly ITaxationRepository _taxRepository;
        public TaxationService(ITaxationRepository taxationRepository)
        { 
            _taxRepository = taxationRepository;
        }
        public void SaveTaxDeclaration(TaxDeclarationDTO taxDeclaration)
        {
            _taxRepository.Save(taxDeclaration);
        }
        public TaxDeclarationDTO GetTaxDeclarationById(int id)
        {
            return _taxRepository.Get(id);
        }
    }
}
