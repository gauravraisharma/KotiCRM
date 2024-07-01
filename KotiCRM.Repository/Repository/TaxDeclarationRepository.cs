using Azure;
using KotiCRM.Repository.Constants;
using KotiCRM.Repository.Data;
using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace KotiCRM.Repository.Repository
{
    public class TaxDeclarationRepository : ITaxDeclarationRepository
    {
        private readonly KotiCRMDbContext _context;
        private readonly string _documentProofsPath; // Path where document proofs are stored

        public TaxDeclarationRepository(KotiCRMDbContext context, IConfiguration configuration)
        {
            _context = context;
            _documentProofsPath = configuration.GetSection("BaseFileConfig:Path").Value;
        }


        // Form 12BB - Retrieve Employee12BB record for a given employee and financial year

        public async Task<Employee12BBDTO> GetEmployee12BB(string employeeId, string financialYear)
        {
            // Fetch the main form data for the employee and financial year
            var employeeDataForm = _context.Employee12BBs.FirstOrDefault(e => e.EmployeeId == employeeId && e.FinancialYear == financialYear);
            // Fetch house rent declaration data and create a new object
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

            // Fetch travel expenditure declaration data and create a new object
            var leaveTravelRecordData = _context.TravelExpenditureDeclarations.FirstOrDefault(x => x.Id == employeeDataForm.TravelExpenditureRecordId);
            TravelExpenditureDeclaration travelExpenditureDeclaration = new TravelExpenditureDeclaration
            {

                Id = leaveTravelRecordData.Id,
                Amount = (int)leaveTravelRecordData.Amount,
                ProofDocumentLink = leaveTravelRecordData.ProofDocumentLink,
                Remarks = leaveTravelRecordData.Remarks,
                IsVerified = false

            };
            // Fetch home loan declaration data and create a new object
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

            // Fetch and prepare 80C declarations list
            var eightyCRecordData = _context.EightyCDeclarations.Where(x => x.Employee12BBId == employeeDataForm.Id).ToList();
            List<EightyCDeclaration> eightyCDeclarationsList = new List<EightyCDeclaration>();

            foreach (var recordData in eightyCRecordData)
            {
                var eightyCDeductionType = _context.EightyCDeductionTypes.Where(x => x.Id == recordData.DeductionTypeId).ToList();
                EightyCDeclaration eightyCDeclaration = new EightyCDeclaration
                {
                    Id = recordData.Id,
                    DeductionTypeId = recordData.DeductionTypeId,
                    Amount = (int)recordData.Amount,
                    ProofDocumentLink = recordData.ProofDocumentLink,
                    Remarks = recordData.Remarks,
                    IsVerified = false,
                    CreatedBy = recordData.CreatedBy,
                    ModifiedBy = recordData.ModifiedBy,
                    ModifiedOn = DateTime.Now,
                    IsDelete = false,
                    Employee12BBId = recordData.Id,
                    EightyCDeductionTypes = eightyCDeductionType,
                };

                eightyCDeclarationsList.Add(eightyCDeclaration);
            }
            var eightyCDeductionTypes = _context.EightyCDeductionTypes.ToList();

            // Fetch 80D declaration data and create a new object
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
            // Fetch 80G declaration data and create a new object
            var EightyGRecordData = _context.EightyGDeclarations.FirstOrDefault(x => x.Id == employeeDataForm.EightyGRecordId);
            EightyGDeclaration eightyGDeclaration = new EightyGDeclaration
            {

                Id = EightyGRecordData.Id,
                NameOfDonee = EightyGRecordData.NameOfDonee,
                Amount = EightyGRecordData.Amount,
                PanNumber = EightyGRecordData.PanNumber,
                Address = EightyGRecordData.Address,
                ProofDocumentLink = EightyGRecordData.ProofDocumentLink,
                Remarks = EightyGRecordData.Remarks,
                IsVerified = false

            };

            // Fetch other investment declaration data and create a new object
            var otherInvestmentRecordData = _context.OtherInvestmentDeclarations.FirstOrDefault(x => x.Id == employeeDataForm.OtherInvestmentRecordId);
            OtherInvestmentDeclaration otherInvestmentDeclaration = new OtherInvestmentDeclaration
            {
                Id = otherInvestmentRecordData.Id,
                Description = otherInvestmentRecordData.Description,
                ProofDocumentLink = otherInvestmentRecordData.ProofDocumentLink,
                Remarks = otherInvestmentRecordData.Remarks,
                IsVerified = false
            };

            // Create and return the final Employee12BB object
            Employee12BBDTO employee12BB = new Employee12BBDTO
            {
                Id = employeeDataForm.Id,
                EmployeeId = employeeDataForm.EmployeeId,
                FinancialYear = employeeDataForm.FinancialYear,
                HouseRentRecordId = houseRentDeclaration.Id,
                HomeLoanRecordId = homeLoanDeclaration.Id,
                TravelExpenditureRecordId = travelExpenditureDeclaration.Id,
                EightyDRecordId = eightyDDeclaration.Id,
                EightyGRecordId = eightyGDeclaration.Id,
                OtherInvestmentRecordId = otherInvestmentDeclaration.Id,
                HouseRentRecord = houseRentDeclaration,
                TravelExpenditureRecord = travelExpenditureDeclaration,
                HomeLoanRecord = homeLoanDeclaration,
                EightyCDeclarations = eightyCDeclarationsList,
                EightyCDeductionTypes = eightyCDeductionTypes,
                EightyDRecord = eightyDDeclaration,
                EightyGRecord = eightyGDeclaration,
                OtherInvestmentRecord = otherInvestmentDeclaration
            };
            return employee12BB;
        }
        // Retrieve all Employee12BB records for a given employee
        public async Task<List<Employee12BB>> GetEmployee12BBs(string employeeId)
        {
            return _context.Employee12BBs.Where(e => e.EmployeeId == employeeId).OrderByDescending(e => e.FinancialYear).ToList();
        }

        // Save form 12BB and return the updated DTO
        public async Task<Employee12BB> SaveEmployee12BB(Employee12BB employee12BB)
        {
            if(employee12BB == null)
            {
                throw new Exception("sdhf shf");
            }
            var existingEmployee12BBs = _context.Employee12BBs.SingleOrDefault(x => x.Id == employee12BB.Id);
            // Update house rent declaration data if present


            if (employee12BB.HouseRentRecordId > 0)
            {
               var houseRentDeclarations = _context.HouseRentDeclarations.SingleOrDefault(x => x.Id == employee12BB.HouseRentRecordId);
                if(houseRentDeclarations == null) { }
                houseRentDeclarations.Amount = employee12BB.HouseRentRecord.Amount;
                houseRentDeclarations.OwnerPanCard = employee12BB.HouseRentRecord.OwnerPanCard;
                houseRentDeclarations.ProofDocumentLink = employee12BB.HouseRentRecord.ProofDocumentLink;
                houseRentDeclarations.IsVerified = employee12BB.HouseRentRecord.IsVerified;
                houseRentDeclarations.Remarks = employee12BB.HouseRentRecord.Remarks;
                _context.HouseRentDeclarations.Update(houseRentDeclarations);
                _context.SaveChanges();
            }
            // Update travel expenditure declaration data if present
            if (employee12BB.TravelExpenditureRecordId > 0)
            {
                var travelExpenditureDeclarations = _context.TravelExpenditureDeclarations.SingleOrDefault(x => x.Id == employee12BB.TravelExpenditureRecordId);
                if (travelExpenditureDeclarations == null) { }
                travelExpenditureDeclarations.Amount = employee12BB.TravelExpenditureRecord.Amount;
                travelExpenditureDeclarations.ProofDocumentLink = employee12BB.TravelExpenditureRecord.ProofDocumentLink;
                travelExpenditureDeclarations.IsVerified = employee12BB.TravelExpenditureRecord.IsVerified;
                travelExpenditureDeclarations.Remarks = employee12BB.TravelExpenditureRecord.Remarks;
                _context.TravelExpenditureDeclarations.Update(travelExpenditureDeclarations);
                _context.SaveChanges();
            }
            // Update home loan declaration data if present
            if (employee12BB.HomeLoanRecordId > 0)
            {
                var homeLoanDeclarations = _context.HomeLoanDeclarations.SingleOrDefault(x => x.Id == employee12BB.HomeLoanRecordId);
                if (homeLoanDeclarations == null) { }
                homeLoanDeclarations.Amount = employee12BB.HomeLoanRecord.Amount;
                homeLoanDeclarations.LenderName = employee12BB.HomeLoanRecord.LenderName;
                homeLoanDeclarations.LenderAddress = employee12BB.HomeLoanRecord.LenderAddress;
                homeLoanDeclarations.LenderPanNumber = employee12BB.HomeLoanRecord.LenderPanNumber;
                homeLoanDeclarations.ProofDocumentLink = employee12BB.HomeLoanRecord.ProofDocumentLink;
                homeLoanDeclarations.IsVerified = employee12BB.HomeLoanRecord.IsVerified;
                homeLoanDeclarations.Remarks = employee12BB.HomeLoanRecord.Remarks;
                _context.HomeLoanDeclarations.Update(homeLoanDeclarations);
                _context.SaveChanges();
            }
            if (employee12BB.Id > 0)
            {

                // Fetch existing declarations from the database
                var existingEightyCDeclarations = _context.EightyCDeclarations.Where(x => x.Employee12BBId == employee12BB.Id).ToList();

                // Iterate through the current list of declarations sent from the client
                foreach (var eightyCDeclaration in employee12BB.EightyCDeclarations)
                {
                    // Find the matching existing declaration (if any)
                    var existingEightyCDeclaration = existingEightyCDeclarations.FirstOrDefault(x => x.Id == eightyCDeclaration.Id);

                    if (existingEightyCDeclaration != null)
                    {
                        // Update the existing declaration
                        existingEightyCDeclaration.DeductionTypeId = eightyCDeclaration.DeductionTypeId;
                        existingEightyCDeclaration.Amount = eightyCDeclaration.Amount;
                        existingEightyCDeclaration.ProofDocumentLink = eightyCDeclaration.ProofDocumentLink;
                        existingEightyCDeclaration.Remarks = eightyCDeclaration.Remarks;
                        existingEightyCDeclaration.IsVerified = eightyCDeclaration.IsVerified;
                        existingEightyCDeclaration.ModifiedBy = eightyCDeclaration.ModifiedBy;
                        existingEightyCDeclaration.ModifiedOn = DateTime.Now;
                        existingEightyCDeclaration.IsDelete = false;

                        _context.EightyCDeclarations.Update(existingEightyCDeclaration);
                    }
                    else
                    {
                        // Create a new declaration
                        var newEightyCDeclaration = new EightyCDeclaration
                        {
                            Employee12BBId = employee12BB.Id,
                            DeductionTypeId = eightyCDeclaration.DeductionTypeId,
                            Amount = eightyCDeclaration.Amount,
                            ProofDocumentLink = eightyCDeclaration.ProofDocumentLink,
                            Remarks = eightyCDeclaration.Remarks,
                            IsVerified = eightyCDeclaration.IsVerified,
                            CreatedBy = eightyCDeclaration.CreatedBy,
                            CreatedOn = DateTime.Now,
                            ModifiedBy = eightyCDeclaration.ModifiedBy,
                            ModifiedOn = DateTime.Now,
                            IsDelete = false
                        };

                        _context.EightyCDeclarations.Add(newEightyCDeclaration);
                    }
                }

                // Optionally, if you want to remove declarations that are no longer in the current list
                foreach (var existingEightyCDeclaration in existingEightyCDeclarations)
                {
                    if (!employee12BB.EightyCDeclarations.Any(x => x.Id == existingEightyCDeclaration.Id))
                    {
                        // Mark as deleted or remove from the context
                        existingEightyCDeclaration.IsDelete = true;
                        _context.EightyCDeclarations.Update(existingEightyCDeclaration);
                    }
                }
                _context.SaveChanges();
            }
            // Update 80D declaration data if present
            if (employee12BB.EightyDRecordId > 0)
            {
                var eightyDDeclarations = _context.EightyDDeclarations.SingleOrDefault(x => x.Id == employee12BB.EightyDRecordId);
                if (eightyDDeclarations == null) { }
                eightyDDeclarations.InsuranceAmount = employee12BB.EightyDRecord.InsuranceAmount;
                eightyDDeclarations.InsuranceProofLink = employee12BB.EightyDRecord.InsuranceProofLink;
                eightyDDeclarations.MedicalExpenseAmount = employee12BB.EightyDRecord.MedicalExpenseAmount;
                eightyDDeclarations.MedicalExpenseProof = employee12BB.EightyDRecord.MedicalExpenseProof;
                eightyDDeclarations.IsVerified = employee12BB.EightyDRecord.IsVerified;
                eightyDDeclarations.Remarks = employee12BB.EightyDRecord.Remarks;
                _context.EightyDDeclarations.Update(eightyDDeclarations);
                _context.SaveChanges();
            }
            // Update 80G declaration data if present
            if (employee12BB.EightyGRecordId > 0)
            {
                var eightyGDeclarations = _context.EightyGDeclarations.SingleOrDefault(x => x.Id == employee12BB.EightyGRecordId);
                if (eightyGDeclarations == null) { }
                eightyGDeclarations.NameOfDonee = employee12BB.EightyGRecord.NameOfDonee;
                eightyGDeclarations.PanNumber = employee12BB.EightyGRecord.PanNumber;
                eightyGDeclarations.Address = employee12BB.EightyGRecord.Address;
                eightyGDeclarations.Amount = employee12BB.EightyGRecord.Amount;
                eightyGDeclarations.ProofDocumentLink = employee12BB.EightyGRecord.ProofDocumentLink;
                eightyGDeclarations.IsVerified = employee12BB.EightyGRecord.IsVerified;
                eightyGDeclarations.Remarks = employee12BB.EightyGRecord.Remarks;
                _context.EightyGDeclarations.Update(eightyGDeclarations);
                _context.SaveChanges();
            }
            // Update other investment declaration data if present
            if (employee12BB.OtherInvestmentRecordId > 0)
            {
                var otherInvestmentDeclarations = _context.OtherInvestmentDeclarations.SingleOrDefault(x => x.Id == employee12BB.OtherInvestmentRecordId);
                if (otherInvestmentDeclarations == null) { }
                otherInvestmentDeclarations.Description = employee12BB.OtherInvestmentRecord.Description;
                otherInvestmentDeclarations.ProofDocumentLink = employee12BB.OtherInvestmentRecord.ProofDocumentLink;
                otherInvestmentDeclarations.IsVerified = employee12BB.OtherInvestmentRecord.IsVerified;
                otherInvestmentDeclarations.Remarks = employee12BB.OtherInvestmentRecord.Remarks;
                _context.OtherInvestmentDeclarations.Update(otherInvestmentDeclarations);
                _context.SaveChanges();
            }

            // Update the main Employee12BB form

            existingEmployee12BBs.EmployeeId = employee12BB.EmployeeId;
            existingEmployee12BBs.FinancialYear = employee12BB.FinancialYear;
            existingEmployee12BBs.HouseRentRecordId = employee12BB.HouseRentRecordId;
            existingEmployee12BBs.TravelExpenditureRecordId = employee12BB.TravelExpenditureRecordId;
            existingEmployee12BBs.HomeLoanRecordId = employee12BB.HomeLoanRecordId;
            existingEmployee12BBs.EightyDRecordId = employee12BB.EightyDRecordId;
            existingEmployee12BBs.EightyGRecordId = employee12BB.EightyGRecordId;
            existingEmployee12BBs.OtherInvestmentRecordId = employee12BB.OtherInvestmentRecordId;
            existingEmployee12BBs.ModifiedBy = employee12BB.ModifiedBy;
            existingEmployee12BBs.ModifiedOn = DateTime.Now;
            existingEmployee12BBs.IsDelete = employee12BB.IsDelete;
            existingEmployee12BBs.IsActive = employee12BB.IsActive;
            existingEmployee12BBs.IsFormVerified = employee12BB.IsFormVerified;
            existingEmployee12BBs.IsDeclarationComplete = employee12BB.IsDeclarationComplete;

            var employee12BBDto = new Employee12BB
            {
                //Id = employee12BB.Id,
                EmployeeId = existingEmployee12BBs.EmployeeId,
                FinancialYear = existingEmployee12BBs.FinancialYear,
                HouseRentRecordId = existingEmployee12BBs.HouseRentRecordId,
                TravelExpenditureRecordId = existingEmployee12BBs.TravelExpenditureRecordId,
                HomeLoanRecordId = existingEmployee12BBs.HomeLoanRecordId,
                EightyDRecordId = existingEmployee12BBs.EightyDRecordId,
                EightyGRecordId = existingEmployee12BBs.EightyGRecordId,
                OtherInvestmentRecordId = existingEmployee12BBs.OtherInvestmentRecordId,
                ModifiedBy = existingEmployee12BBs.ModifiedBy,
                ModifiedOn = DateTime.Now,
                IsDelete = existingEmployee12BBs.IsDelete,
                IsActive = existingEmployee12BBs.IsActive,
                IsFormVerified = existingEmployee12BBs.IsFormVerified,
                IsDeclarationComplete = existingEmployee12BBs.IsDeclarationComplete
            };

            _context.Employee12BBs.Update(existingEmployee12BBs);
            var result = await _context.SaveChangesAsync();
            if(result <= 0)
            {

            }
            return employee12BBDto;
        }

        public async Task<bool> UploadDocumentProofs(IFormCollection formCollection)
        {
            // Extract files
            var files = formCollection.Files;
            if (files == null || files.Count == 0)
                throw new ArgumentNullException(nameof(files), "ProofDocumentLink is required");

            // Extract sections and field names
            var sections = formCollection.Where(kvp => kvp.Key.Contains("section")).Select(kvp => kvp.Value.ToString()).ToList();
            var fieldNames = formCollection.Where(kvp => kvp.Key.Contains("fieldName")).Select(kvp => kvp.Value.ToString()).ToList();

            // Process each file along with its section and field name
            foreach (var file in files)
            {
                var fileIndex = int.Parse(file.Name.Split('[')[1].Split(']')[0]);
                var section = sections[fileIndex];
                var fieldName = fieldNames[fileIndex];

                var subFolder = char.ToUpper(section[0]) + section.Substring(1) + " Proofs";
                string fullPath = "";
                string fileName = "";

                if (section == "80dDeduction")
                {
                    var subFolder80D = char.ToUpper(fieldName[0]) + fieldName.Substring(1);

                    // Process file, section, and fieldName as needed
                    if (!Directory.Exists(_documentProofsPath + '/' + PathConstant.TAX_DECLARATION_FOLDER + '/' + subFolder + '/' + subFolder80D))
                    {
                        Directory.CreateDirectory(_documentProofsPath + '/' + PathConstant.TAX_DECLARATION_FOLDER + '/' + subFolder + '/' + subFolder80D);
                    }
                    fileName = String.Concat(DateTime.Now.ToString("MM_dd_yyyy_HH_mm"), "_", file.FileName);
                    fullPath = Path.Combine(_documentProofsPath, PathConstant.TAX_DECLARATION_FOLDER, subFolder, subFolder80D, fileName);

                }
                else
                {
                    // Process file, section, and fieldName as needed
                    if (!Directory.Exists(_documentProofsPath + '/' + PathConstant.TAX_DECLARATION_FOLDER + '/' + subFolder))
                    {
                        Directory.CreateDirectory(_documentProofsPath + '/' + PathConstant.TAX_DECLARATION_FOLDER + '/' + subFolder);
                    }
                    fileName = String.Concat(DateTime.Now.ToString("MM_dd_yyyy_HH_mm"), "_", file.FileName);
                    fullPath = Path.Combine(_documentProofsPath, PathConstant.TAX_DECLARATION_FOLDER, subFolder, fileName);
                }

                // Save the document proof to the file system
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            return true;

        }

    }
}