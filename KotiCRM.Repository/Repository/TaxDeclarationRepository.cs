using Azure;
using KotiCRM.Repository.Data;
using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class TaxDeclarationRepository : ITaxDeclarationRepository
    {
        private readonly KotiCRMDbContext _context;

        public TaxDeclarationRepository(KotiCRMDbContext context)
        {
            _context = context;
        }

        //get house rent 
        public async Task<HouseRentRecordDTO> GetHouseRent(int id)
        {
            try
            {
          
                var houseRentDeclaration =  _context.HouseRentDeclarations.FirstOrDefault(x => x.Id == id);

        
                if (houseRentDeclaration == null)
                {
                    throw new Exception("House rent record not found.");
                }

           
                var houseRentRecordDTO = new HouseRentRecordDTO
                {
                    Id= houseRentDeclaration.Id,
                    Amount = houseRentDeclaration.Amount,
                    OwnerPanCard = houseRentDeclaration.OwnerPanCard,
                    ProofDocumentLink = houseRentDeclaration.ProofDocumentLink,
                    Remarks = houseRentDeclaration.Remarks,
                    IsVerified = houseRentDeclaration.IsVerified
                };

                return houseRentRecordDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving the house rent record: {ex.Message}", ex);
            }
        }
        //get leave travel
        public async Task<TravelExpenditureDeclarationDTO> GetLeaveTravelExpenditure(int id)
        {
            try
            {
                var travelExpenditure = await _context.TravelExpenditureDeclarations.FirstOrDefaultAsync(x => x.Id == id);

                if (travelExpenditure == null)
                {
                    throw new Exception("Travel expenditure not found");
                }

                var travelExpenditureDeclarationDTO = new TravelExpenditureDeclarationDTO
                {
                    Id = travelExpenditure.Id,
                    Amount = (int)travelExpenditure.Amount,
                    ProofDocumentLink = travelExpenditure.ProofDocumentLink,
                    Remarks = travelExpenditure.Remarks,
                    IsVerified = false
                };

                return travelExpenditureDeclarationDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while fetching the travel expenditure: {ex.Message}", ex);
            }
        }
        //  get interest on home loan
        public async Task<HomeLoanRecordDTO> GetInterestPayableOnHome(int id)
        {
            try
            {

                var homeLoanRecord = await _context.HomeLoanDeclarations.FirstOrDefaultAsync(x => x.Id == id);

                if (homeLoanRecord == null)
                {
                    throw new Exception("Home loan record not found");
                }

                // Convert the retrieved entity to DTO
                var homeLoanRecordDTO = new HomeLoanRecordDTO
                {
                    Id = homeLoanRecord.Id,
                    LenderName = homeLoanRecord.LenderName,
                    LenderAddress = homeLoanRecord.LenderAddress,
                    LenderPanNumber = homeLoanRecord.LenderPanNumber,
                    Amount = homeLoanRecord.Amount,
                    ProofDocumentLink = homeLoanRecord.ProofDocumentLink,
                    Remarks = homeLoanRecord.Remarks,
                    IsVerified = homeLoanRecord.IsVerified
                };

                return homeLoanRecordDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving the home loan record: {ex.Message}", ex);
            }
        }

        // get 80 C
        public async Task<EightyCRecordDTO> GetEightyC(int employee12BBId)
        {
            try
            {
                var eightyCRecord =  await _context.EightyCDeclarations.FirstOrDefaultAsync(x => x.Employee12BBId == employee12BBId);

                if (eightyCRecord == null)
                {
                    throw new Exception($"EightyC record with id {employee12BBId} not found.");
                }

                var eightyCRecordDTO = new EightyCRecordDTO
                {
                    Id =eightyCRecord.Id,
                    DeductionTypeId = eightyCRecord.DeductionTypeId,
                    Amount = eightyCRecord.Amount,
                    ProofDocumentLink = eightyCRecord.ProofDocumentLink,
                    Remarks = eightyCRecord.Remarks
                    
                };

                return eightyCRecordDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while getting EightyC record: {ex.Message}", ex);
            }
        }
        //get 80 c deduction type 
        public async Task<IEnumerable<EightyCDeductionType>> GetDeductionTypesAsync()
        {
            return await _context.EightyCDeductionTypes.ToListAsync();
        }
        // get 80 D
        public async Task<EightyDRecordDTO> GetEightyD(int id)
        {
            try
            {
                var eightyDRecord = await _context.EightyDDeclarations.FindAsync(id);

         
                if (eightyDRecord == null)
                {
                 
                    throw new Exception($"EightyDDeclaration with id {id} not found.");
                }

       
                var eightyDRecordDTO = new EightyDRecordDTO
                {
                    Id = eightyDRecord.Id,
                    InsuranceAmount = eightyDRecord.InsuranceAmount,
                    InsuranceProofLink = eightyDRecord.InsuranceProofLink,
                    MedicalExpenseAmount = eightyDRecord.MedicalExpenseAmount,
                    MedicalExpenseProof = eightyDRecord.MedicalExpenseProof,
                    Remarks = eightyDRecord.Remarks,
                    IsVerified = eightyDRecord.IsVerified
                };

                return eightyDRecordDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving EightyDDeclaration: {ex.Message}", ex);
            }
        }
        // Retrieve EightyG record by ID
        public async Task<EightyGRecordDTO> GetEightyG(int id)
        {
            try
            {
                var eightyGRecord = await _context.EightyGDeclarations.FindAsync(id);
                if (eightyGRecord == null)
                    throw new Exception($"EightyG record with ID {id} not found");

                var eightyGRecordDTO = new EightyGRecordDTO
                {
                    Id = eightyGRecord.Id,
                    NameOfDonee = eightyGRecord.NameOfDonee,
                    PanNumber = eightyGRecord.PanNumber,
                    Address = eightyGRecord.Address,
                    ProofDocumentLink = eightyGRecord.ProofDocumentLink,
                    Remarks = eightyGRecord.Remarks
                };

                return eightyGRecordDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving EightyG record: {ex.Message}", ex);
            }
        }

        //  Other Investment record by ID
        public async Task<OtherInvestmentRecordDTO> GetOtherInvestment(int id)
        {
            try
            {
                var otherInvestmentRecord = await _context.OtherInvestmentDeclarations.FindAsync(id);
                if (otherInvestmentRecord == null)
                    throw new Exception($"Other Investment record with ID {id} not found");

                var otherInvestmentRecordDTO = new OtherInvestmentRecordDTO
                {
                    Id =  otherInvestmentRecord.Id,
                    Description = otherInvestmentRecord.Description,
                    ProofDocumentLink = otherInvestmentRecord.ProofDocumentLink,
                    Remarks = otherInvestmentRecord.Remarks
                };

                return otherInvestmentRecordDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving Other Investment record: {ex.Message}", ex);
            }
        }



        public async Task<HouseRentRecordDTO> SaveHouseRent(HouseRentRecordDTO houseRentRecordDTO)
        {
            try
            {
                // Check if a record already exists
                var existingRecord = await _context.HouseRentDeclarations.FirstOrDefaultAsync(hr => hr.OwnerPanCard == houseRentRecordDTO.OwnerPanCard);

                if (existingRecord != null)
                {
                    // Update the existing record
                    existingRecord.Amount = (int)houseRentRecordDTO.Amount;
                    existingRecord.ProofDocumentLink = houseRentRecordDTO.ProofDocumentLink;
                    existingRecord.Remarks = houseRentRecordDTO.Remarks;
                    existingRecord.IsVerified = false;
                }
                else
                {
                    // Add a new record
                    var houseRentDeclaration = new HouseRentDeclaration
                    {
                        Id = houseRentRecordDTO.Id,
                        Amount = (int)houseRentRecordDTO.Amount,
                        OwnerPanCard = houseRentRecordDTO.OwnerPanCard,
                        ProofDocumentLink = houseRentRecordDTO.ProofDocumentLink,
                        Remarks = houseRentRecordDTO.Remarks,
                        IsVerified = false
                    };
                    _context.HouseRentDeclarations.Add(houseRentDeclaration);
                }

                await _context.SaveChangesAsync();
                return houseRentRecordDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while saving House rent: {ex.Message}", ex);
            }
        }

        // leave expenditure
        public async Task<TravelExpenditureDeclarationDTO> SaveLeaveTravelExpenditure(TravelExpenditureDeclarationDTO travelExpenditureDeclarationDTO)
        {
            try
            {
                // Log entry into the method
                Console.WriteLine($"Entering SaveLeaveTravelExpenditure with ID: {travelExpenditureDeclarationDTO.Id}");

                
                var existingRecord = await _context.TravelExpenditureDeclarations
                    .FirstOrDefaultAsync(te => te.Id == travelExpenditureDeclarationDTO.Id);

                if (existingRecord != null)
                {
               
                    Console.WriteLine($"Existing record found for ID: {travelExpenditureDeclarationDTO.Id}");

                    // Update the existing record
                    existingRecord.ProofDocumentLink = travelExpenditureDeclarationDTO.ProofDocumentLink;
                    existingRecord.Remarks = travelExpenditureDeclarationDTO.Remarks;
                    existingRecord.IsVerified = false;

                   
                    _context.Entry(existingRecord).State = EntityState.Modified;
                }
                else
                {
                    // Log that we are creating a new record
                    Console.WriteLine($"No existing record found. Creating new record for ID: {travelExpenditureDeclarationDTO.Id}");

                    // Create a new record
                    var travelExpenditure = new TravelExpenditureDeclaration
                    {
                        Id = travelExpenditureDeclarationDTO.Id,
                        Amount = (int)travelExpenditureDeclarationDTO.Amount,
                        ProofDocumentLink = travelExpenditureDeclarationDTO.ProofDocumentLink,
                        Remarks = travelExpenditureDeclarationDTO.Remarks,
                        IsVerified = false
                    };
                    _context.TravelExpenditureDeclarations.Add(travelExpenditure);
                }

                // Save changes
                var result = await _context.SaveChangesAsync();

                // Log result of the save operation
                Console.WriteLine($"SaveChangesAsync result: {result}");

                return travelExpenditureDeclarationDTO;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred while saving travel expenditure: {ex.Message}");
                throw new Exception($"An error occurred while saving travel expenditure: {ex.Message}", ex);
            }
        }

        // interest on home loan
        public async Task<HomeLoanRecordDTO> SaveInterestPayableOnHome(HomeLoanRecordDTO homeLoanRecordDTO)
        {
            try
            {
                var existingRecord = await _context.HomeLoanDeclarations.FirstOrDefaultAsync(x => x.LenderPanNumber == homeLoanRecordDTO.LenderPanNumber);

                if (existingRecord != null)
                {
                    // Update existing record
                    existingRecord.LenderName = homeLoanRecordDTO.LenderName;
                    existingRecord.LenderAddress = homeLoanRecordDTO.LenderAddress;
                    existingRecord.Amount = (int)homeLoanRecordDTO.Amount;
                    existingRecord.ProofDocumentLink = homeLoanRecordDTO.ProofDocumentLink;
                    existingRecord.Remarks = homeLoanRecordDTO.Remarks;
                    existingRecord.IsVerified = false; // Assuming this needs to be updated too
                    _context.HomeLoanDeclarations.Update(existingRecord);
                }
                else
                {
                    // Add new record
                    var homeLoanRecord = new HomeLoanDeclaration
                    {
                        LenderName = homeLoanRecordDTO.LenderName,
                        LenderAddress = homeLoanRecordDTO.LenderAddress,
                        LenderPanNumber = homeLoanRecordDTO.LenderPanNumber,
                        Amount = (int)homeLoanRecordDTO.Amount,
                        ProofDocumentLink = homeLoanRecordDTO.ProofDocumentLink,
                        Remarks = homeLoanRecordDTO.Remarks,
                        IsVerified = false
                    };
                    _context.HomeLoanDeclarations.Add(homeLoanRecord);
                }

                await _context.SaveChangesAsync();
                return homeLoanRecordDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while saving House rent: {ex.Message}", ex);
            }
        }

        //80 C
        public async Task<EightyCRecordDTO> SaveEightyC(EightyCRecordDTO eightyCRecordDTO)
        {
            try
            {
                var existingRecord = await _context.EightyCDeclarations
                    .FirstOrDefaultAsync(x => x.DeductionTypeId == eightyCRecordDTO.DeductionTypeId);

                if (existingRecord != null)
                {
                    // Update existing record
                    existingRecord.Amount = (int)eightyCRecordDTO.Amount;
                    existingRecord.ProofDocumentLink = eightyCRecordDTO.ProofDocumentLink;
                    existingRecord.Remarks = eightyCRecordDTO.Remarks;
                    existingRecord.ModifiedBy = ""; // Adjust as needed
                    existingRecord.ModifiedOn = DateTime.Now;
                }
                else
                {
                    // Add new record
                    var eightyCRecord = new EightyCDeclaration
                    {
                        DeductionTypeId = eightyCRecordDTO.DeductionTypeId,
                        Amount = (int)eightyCRecordDTO.Amount,
                        ProofDocumentLink = eightyCRecordDTO.ProofDocumentLink,
                        Remarks = eightyCRecordDTO.Remarks,
                        IsVerified = false,
                        CreatedBy = "", // Adjust as needed
                        ModifiedBy = "", // Adjust as needed
                        ModifiedOn = DateTime.Now,
                        IsDelete = false,
                        Employee12BBId = eightyCRecordDTO.Id,
                    };

                    _context.EightyCDeclarations.Add(eightyCRecord);
                }

                await _context.SaveChangesAsync();
                return eightyCRecordDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while saving Eighty C record: {ex.Message}", ex);
            }
        }

        //80 D
        public async Task<EightyDRecordDTO> SaveEightyD(EightyDRecordDTO eightyDRecordDTO)
        {
            try
            {
                var existingRecord = await _context.EightyDDeclarations.FirstOrDefaultAsync(e => e.Id == eightyDRecordDTO.Id);

                if (existingRecord != null)
                {
                    // Update existing record
                    existingRecord.InsuranceAmount = (int)eightyDRecordDTO.InsuranceAmount;
                    existingRecord.InsuranceProofLink = eightyDRecordDTO.InsuranceProofLink;
                    existingRecord.MedicalExpenseAmount = (int)eightyDRecordDTO.MedicalExpenseAmount;
                    existingRecord.MedicalExpenseProof = eightyDRecordDTO.MedicalExpenseProof;
                    existingRecord.Remarks = eightyDRecordDTO.Remarks;
                    existingRecord.IsVerified = false;

                    _context.EightyDDeclarations.Update(existingRecord);
                }
                else
                {
                    // Add new record
                    var eightyDRecord = new EightyDDeclaration
                    {
                        Id = eightyDRecordDTO.Id,
                        InsuranceAmount = (int)eightyDRecordDTO.InsuranceAmount,
                        InsuranceProofLink = eightyDRecordDTO.InsuranceProofLink,
                        MedicalExpenseAmount = (int)eightyDRecordDTO.MedicalExpenseAmount,
                        MedicalExpenseProof = eightyDRecordDTO.MedicalExpenseProof,
                        Remarks = eightyDRecordDTO.Remarks,
                        IsVerified = false
                    };

                    _context.EightyDDeclarations.Add(eightyDRecord);
                }

                await _context.SaveChangesAsync();
                return eightyDRecordDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while saving or updating: {ex.Message}", ex);
            }
        }

        //80 G
        public async Task<EightyGRecordDTO> SaveEightyG(EightyGRecordDTO eightyGRecordDTO)
        {
            try
            {
                var existingRecord = await _context.EightyGDeclarations.FirstOrDefaultAsync(e => e.Id == eightyGRecordDTO.Id);

                if (existingRecord != null)
                {
                    // Update existing record
                    existingRecord.NameOfDonee = eightyGRecordDTO.NameOfDonee;
                    existingRecord.PanNumber = eightyGRecordDTO.PanNumber;
                    existingRecord.Address = eightyGRecordDTO.Address;
                    existingRecord.ProofDocumentLink = eightyGRecordDTO.ProofDocumentLink;
                    existingRecord.Remarks = eightyGRecordDTO.Remarks;

                    _context.EightyGDeclarations.Update(existingRecord);
                }
                else
                {
                    // Add new record
                    var newRecord = new EightyGDeclaration
                    {
                        Id = eightyGRecordDTO.Id,
                        NameOfDonee = eightyGRecordDTO.NameOfDonee,
                        PanNumber = eightyGRecordDTO.PanNumber,
                        Address = eightyGRecordDTO.Address,
                        ProofDocumentLink = eightyGRecordDTO.ProofDocumentLink,
                        Remarks = eightyGRecordDTO.Remarks,
                        IsVerified = false
                    };

                    _context.EightyGDeclarations.Add(newRecord);
                }

                await _context.SaveChangesAsync();
                return eightyGRecordDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while saving or updating EightyG record: {ex.Message}", ex);
            }
        }


        //OtherInvestment
        public async Task<OtherInvestmentRecordDTO> SaveOtherInvestment(OtherInvestmentRecordDTO otherInvestmentRecordDTO)
        {
            try
            {
                var existingRecord = await _context.OtherInvestmentDeclarations
                                                   .FirstOrDefaultAsync(x => x.Id == otherInvestmentRecordDTO.Id);

                if (existingRecord != null)
                {
                    // Update existing record
                    existingRecord.Description = otherInvestmentRecordDTO.Description;
                    existingRecord.ProofDocumentLink = otherInvestmentRecordDTO.ProofDocumentLink;
                    existingRecord.Remarks = otherInvestmentRecordDTO.Remarks;
                    existingRecord.IsVerified = false;

                    _context.Entry(existingRecord).State = EntityState.Modified;
                }
                else
                {
                    // Add new record
                    var newOtherInvestmentRecord = new OtherInvestmentDeclaration
                    {
                        Id = otherInvestmentRecordDTO.Id,
                        Description = otherInvestmentRecordDTO.Description,
                        ProofDocumentLink = otherInvestmentRecordDTO.ProofDocumentLink,
                        Remarks = otherInvestmentRecordDTO.Remarks,
                        IsVerified = false
                    };

                    _context.OtherInvestmentDeclarations.Add(newOtherInvestmentRecord);
                }

                await _context.SaveChangesAsync();
                return otherInvestmentRecordDTO;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while saving Other Investment: {ex.Message}", ex);
            }
        }


        //Form 12BB

        public async Task<Employee12BB> GetEmployee12BB(string employeeId, string financialYear)
        {
            var employeeDataForm = _context.Employee12BBs.FirstOrDefault(e => e.EmployeeId == employeeId && e.FinancialYear == financialYear);

            var houserentRecordData = _context.HouseRentDeclarations.FirstOrDefault(x => x.Id == employeeDataForm.HouseRentRecordId);
            HouseRentDeclaration houseRentDeclaration = new HouseRentDeclaration
            {
                Id = houserentRecordData.Id,
                Amount = houserentRecordData.Amount,
                ProofDocumentLink = houserentRecordData.ProofDocumentLink,
                OwnerPanCard = houserentRecordData.OwnerPanCard,
                Remarks = houserentRecordData.Remarks,
                IsVerified = houserentRecordData.IsVerified

            };
            var leaveTravelRecordData = _context.TravelExpenditureDeclarations.FirstOrDefault(x => x.Id == employeeDataForm.TravelExpenditureRecordId);
            TravelExpenditureDeclaration travelExpenditureDeclaration = new TravelExpenditureDeclaration
            {

                Id = leaveTravelRecordData.Id,
                Amount = (int)leaveTravelRecordData.Amount,
                ProofDocumentLink = leaveTravelRecordData.ProofDocumentLink,
                Remarks = leaveTravelRecordData.Remarks,
                IsVerified = false

            };
            var InterestOnHomLoanRecordData = _context.HomeLoanDeclarations.FirstOrDefault(x => x.Id == employeeDataForm.HomeLoanRecordId);
            HomeLoanDeclaration homeLoanDeclaration = new HomeLoanDeclaration
            {
                Id = InterestOnHomLoanRecordData.Id,
                LenderName = InterestOnHomLoanRecordData.LenderName,
                LenderAddress = InterestOnHomLoanRecordData.LenderAddress,
                Amount = (int)InterestOnHomLoanRecordData.Amount,
                ProofDocumentLink = InterestOnHomLoanRecordData.ProofDocumentLink,
                Remarks = InterestOnHomLoanRecordData.Remarks,
                IsVerified = false, // Assuming this needs to be updated too
             };
            var eightyCRecordData = _context.EightyCDeclarations.Where(x => x.Id == employeeDataForm.EightyCRecordId).ToList();

            List<EightyCDeclaration> eightyCDeclarationsList = new List<EightyCDeclaration>();

            foreach (var recordData in eightyCRecordData)
            {
                EightyCDeclaration eightyCDeclaration = new EightyCDeclaration
                {
                    
                    DeductionTypeId = recordData.DeductionTypeId,
                    Amount = (int)recordData.Amount,
                    ProofDocumentLink = recordData.ProofDocumentLink,
                    Remarks = recordData.Remarks,
                    IsVerified = false,
                    CreatedBy = "",
                    ModifiedBy = "",
                    ModifiedOn = DateTime.Now,
                    IsDelete = false,
                    Employee12BBId = recordData.Id,
                };

                eightyCDeclarationsList.Add(eightyCDeclaration);
          }

            var EightyDRecordData = _context.EightyDDeclarations.FirstOrDefault(x => x.Id == employeeDataForm.EightyDRecordId);
            EightyDDeclaration eightyDDeclaration = new EightyDDeclaration
            {
                Id = EightyDRecordData.Id,
                InsuranceAmount = (int)EightyDRecordData.InsuranceAmount,
                InsuranceProofLink = EightyDRecordData.InsuranceProofLink,
                MedicalExpenseAmount = (int)EightyDRecordData.MedicalExpenseAmount,
                MedicalExpenseProof = EightyDRecordData.MedicalExpenseProof,
                Remarks = EightyDRecordData.Remarks,
                IsVerified = false
            };
            var EightyGRecordData = _context.EightyGDeclarations.FirstOrDefault(x => x.Id == employeeDataForm.EightyGRecordId);
            EightyGDeclaration eightyGDeclaration = new EightyGDeclaration
            {

                Id = EightyGRecordData.Id,
                NameOfDonee = EightyGRecordData.NameOfDonee,
                PanNumber = EightyGRecordData.PanNumber,
                Address = EightyGRecordData.Address,
                ProofDocumentLink = EightyGRecordData.ProofDocumentLink,
                Remarks = EightyGRecordData.Remarks,
                IsVerified = false

            };
            var otherInvestmentRecordData = _context.OtherInvestmentDeclarations.FirstOrDefault(x => x.Id == employeeDataForm.OtherInvestmentRecordId);
            OtherInvestmentDeclaration otherInvestmentDeclaration = new OtherInvestmentDeclaration
            {
                Id = otherInvestmentRecordData.Id,
                Description = otherInvestmentRecordData.Description,
                ProofDocumentLink = otherInvestmentRecordData.ProofDocumentLink,
                Remarks = otherInvestmentRecordData.Remarks,
                IsVerified = false
            };
          
            Employee12BB employee12BB = new Employee12BB
            {
                Id = employeeDataForm.Id,
                HouseRentRecord = houseRentDeclaration,
                TravelExpenditureRecord = travelExpenditureDeclaration,
                HomeLoanRecord = homeLoanDeclaration,
                EightyCDeclarations = eightyCDeclarationsList,
                EightyDRecord = eightyDDeclaration,
                EightyGRecord = eightyGDeclaration,
                OtherInvestmentRecord = otherInvestmentDeclaration,

            };
            return employeeDataForm;
        }

        public async Task<List<Employee12BB>> GetEmployee12BBs(string employeeId)
        {
            return _context.Employee12BBs.Where(e => e.EmployeeId == employeeId).OrderByDescending(e => e.FinancialYear).ToList();
        }

        // Save form12BB and return DTO
        public async Task<Employee12BB> SaveEmployee12BB(Employee12BB employee12BB)
        {
            _context.Employee12BBs.Add(employee12BB);
            await _context.SaveChangesAsync();

            // Map the saved entity to the DTO
            var employee12BBDto = new Employee12BB
            {
                Id = employee12BB.Id,
                EmployeeId = employee12BB.EmployeeId,
                FinancialYear = employee12BB.FinancialYear,
                HouseRentRecordId = employee12BB.HouseRentRecordId,
                TravelExpenditureRecordId = employee12BB.TravelExpenditureRecordId,
                HomeLoanRecordId = employee12BB.HomeLoanRecordId,
                EightyDRecordId = employee12BB.EightyDRecordId,
                EightyGRecordId = employee12BB.EightyGRecordId,
                OtherInvestmentRecordId = employee12BB.OtherInvestmentRecordId,
                CreatedBy = employee12BB.CreatedBy,
                CreatedOn = employee12BB.CreatedOn,
                ModifiedBy = employee12BB.ModifiedBy,
                ModifiedOn = employee12BB.ModifiedOn,
                IsDelete = employee12BB.IsDelete,
                IsActive = employee12BB.IsActive,
                IsFormVerified = employee12BB.IsFormVerified,
                IsDeclarationComplete = employee12BB.IsDeclarationComplete
            };

            return employee12BBDto;
        }


    }
}






























        //public async System.Threading.Tasks.Task SaveTaxDeclaration(TaxDeclarationDTO taxDeclarationDTO)
        //{
        //    try
        //    {
        //        var employee12BB = new Employee12BB
        //        {
        //            EmployeeId = taxDeclarationDTO.CommonFormDTO.EmployeeId.ToString(),
        //            FinancialYear = taxDeclarationDTO.CommonFormDTO.FinancialYear,
        //            CreatedBy = "system",
        //            CreatedOn = DateTime.Now,
        //            ModifiedBy = "system",
        //            ModifiedOn = DateTime.Now,
        //            IsDelete = false,
        //            IsActive = true,
        //            IsFormVerified = false,
        //            IsDeclarationComplete = false
        //        };

            //        // House Rent Declaration
            //        if (taxDeclarationDTO.HouseRentRecordDTO != null)
            //        {
            //            var houseRent = new HouseRentDeclaration
            //            {
            //                Amount = (int)taxDeclarationDTO.HouseRentRecordDTO.Amount,
            //                OwnerPanCard = taxDeclarationDTO.HouseRentRecordDTO.OwnerPanCard,
            //                ProofDocumentLink = taxDeclarationDTO.HouseRentRecordDTO.ProofDocumentLink,
            //                IsVerified = taxDeclarationDTO.HouseRentRecordDTO.IsVerified,
            //                Remarks = taxDeclarationDTO.HouseRentRecordDTO.Remarks
            //            };
            //            employee12BB.HouseRentRecord = houseRent;
            //        }

            //        // Travel Expenditure Declaration
            //        if (taxDeclarationDTO.TravelExpenditureDeclarationDTO != null)
            //        {
            //            var travelExpenditure = new TravelExpenditureDeclaration
            //            {
            //                Amount = (int)taxDeclarationDTO.TravelExpenditureDeclarationDTO.Amount,
            //                ProofDocumentLink = taxDeclarationDTO.TravelExpenditureDeclarationDTO.ProofDocumentLink,
            //                IsVerified = taxDeclarationDTO.TravelExpenditureDeclarationDTO.IsVerified,
            //                Remarks = taxDeclarationDTO.TravelExpenditureDeclarationDTO.Remarks
            //            };
            //            employee12BB.TravelExpenditureRecord = travelExpenditure;
            //        }

            //        // Home Loan Declaration
            //        if (taxDeclarationDTO.HomeLoanRecordDTO != null)
            //        {
            //            var homeLoan = new HomeLoanDeclaration
            //            {
            //                LenderName = taxDeclarationDTO.HomeLoanRecordDTO.LenderName,
            //                LenderAddress = taxDeclarationDTO.HomeLoanRecordDTO.LenderAddress,
            //                LenderPanNumber = taxDeclarationDTO.HomeLoanRecordDTO.LenderPanNumber,
            //                Amount = (int)taxDeclarationDTO.HomeLoanRecordDTO.Amount,
            //                ProofDocumentLink = taxDeclarationDTO.HomeLoanRecordDTO.ProofDocumentLink,
            //                IsVerified = taxDeclarationDTO.HomeLoanRecordDTO.IsVerified,
            //                Remarks = taxDeclarationDTO.HomeLoanRecordDTO.Remarks
            //            };
            //            employee12BB.HomeLoanRecord = homeLoan;
            //        }

            //       // EightyC Declarations
            //if (taxDeclarationDTO != null && taxDeclarationDTO.EightyCRecordDTO != null)
            //{
            //    foreach (var eightyCRecordDTO in taxDeclarationDTO.EightyCRecordDTO)
            //    {
            //        if (eightyCRecordDTO != null)
            //        {
            //            var eightyC = new EightyCDeclaration
            //            {
            //                DeductionTypeId = eightyCRecordDTO.DeductionTypeId,
            //                Amount = (int)eightyCRecordDTO.Amount,
            //                ProofDocumentLink = eightyCRecordDTO.ProofDocumentLink,
            //                IsVerified = eightyCRecordDTO.IsVerified,
            //                Remarks = eightyCRecordDTO.Remarks,
            //                CreatedBy = "system",
            //                CreatedOn = DateTime.Now,
            //                ModifiedBy = "system",
            //                ModifiedOn = DateTime.Now,
            //                IsDelete = false
            //            };
            //            employee12BB.EightyCDeclarations.Add(eightyC);
            //        }
            //    }
            //}


            // EightyD Declaration
                //if (taxDeclarationDTO.EightyDRecordDTO != null)
                //{
                //    var eightyD = new EightyDDeclaration
                //    {
                //        InsuranceAmount = (int)taxDeclarationDTO.EightyDRecordDTO.InsuranceAmount,
                //        InsuranceProofLink = taxDeclarationDTO.EightyDRecordDTO.InsuranceProofLink,
                //        MedicalExpenseAmount = (int)taxDeclarationDTO.EightyDRecordDTO.MedicalExpenseAmount,
                //        MedicalExpenseProof = taxDeclarationDTO.EightyDRecordDTO.MedicalExpenseProof,
                //        IsVerified = taxDeclarationDTO.EightyDRecordDTO.IsVerified,
                //        Remarks = taxDeclarationDTO.EightyDRecordDTO.Remarks
                //    };
                //    employee12BB.EightyDRecord = eightyD;
                //}

                // EightyG Declaration
                //if (taxDeclarationDTO.EightyGRecordDTO != null)
                //{
                //    var eightyG = new EightyGDeclaration
                //    {
                //        NameOfDonee = taxDeclarationDTO.EightyGRecordDTO.NameOfDonee,
                //        PanNumber = taxDeclarationDTO.EightyGRecordDTO.PanNumber,
                //        Address = taxDeclarationDTO.EightyGRecordDTO.Address,
                //        Amount = (int)taxDeclarationDTO.EightyGRecordDTO.Amount,
                //        ProofDocumentLink = taxDeclarationDTO.EightyGRecordDTO.ProofDocumentLink,
                //        IsVerified = taxDeclarationDTO.EightyGRecordDTO.IsVerified,
                //        Remarks = taxDeclarationDTO.EightyGRecordDTO.Remarks
                //    };
                //    employee12BB.EightyGRecord = eightyG;
                //}

               

                // Other Investment Declaration
            //    if (taxDeclarationDTO.OtherInvestmentRecordDTO != null)
            //    {
            //        var otherInvestment = new OtherInvestmentDeclaration
            //        {
            //            Description = taxDeclarationDTO.OtherInvestmentRecordDTO.Description,
            //            ProofDocumentLink = taxDeclarationDTO.OtherInvestmentRecordDTO.ProofDocumentLink,
            //            IsVerified = taxDeclarationDTO.OtherInvestmentRecordDTO.IsVerified,
            //            Remarks = taxDeclarationDTO.OtherInvestmentRecordDTO.Remarks
            //        };
            //        employee12BB.OtherInvestmentRecord = otherInvestment;
            //    }

            //    // Save to database
            //    _context.Employee12BBs.Add(employee12BB);
            //    await _context.SaveChangesAsync();
            //}
            //catch (Exception ex)
            //{
//                throw new Exception($"An error occurred while saving tax declaration: {ex.Message}", ex);
//            }
//        }
//    }
//}
