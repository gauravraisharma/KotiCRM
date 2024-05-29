using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public  class TaxationRepository:ITaxationRepository
    {
        private readonly List<TaxDeclarationDTO> _taxDeclarations = new List<TaxDeclarationDTO>();

        public void Save(TaxDeclarationDTO taxDeclaration)
        {
                _taxDeclarations.Add(taxDeclaration);
        }
        public TaxDeclarationDTO Get(int id)
        {
            return _taxDeclarations.FirstOrDefault(t => t.Id == id);
        }
    }
}
