using Azure;
using KotiCRM.Repository.Constants;
using KotiCRM.Repository.Constants.Taxation_Constant;
using KotiCRM.Repository.Data;
using KotiCRM.Repository.DTOs.TaxDeclaration;
using KotiCRM.Repository.DTOs.UserManagement;
using KotiCRM.Repository.IRepository;
using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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
        public async Task<Employee12BBDTO> GetEmployee12BB(string employeeId)
        {
            // Fetch the main form data for the employee and financial year

            //var employeeDataForm = _context.Employee12BBs.FirstOrDefault(e => e.EmployeeId == employeeId);
            //var financialYears = _context.FinancialYears.Where(x => x.Employee12BBId == employeeDataForm.Id).ToList();

            var employeeDataForm = await (from e in _context.Employee12BBs
                                          join f in _context.FinancialYears on e.Id equals f.Employee12BBId
                                          where e.EmployeeId == employeeId
                                              //&& f.Financialyear == financialYear
                                              && f.IsActive
                                          select new
                                          {
                                              Employee12BB = e,
                                              FinancialYear = f
                                          }).FirstOrDefaultAsync();


            if (employeeDataForm == null)
            {
                return null; // No data found
            }

            var employee = employeeDataForm.Employee12BB;
            var financialYearData = employeeDataForm.FinancialYear;


            // Fetch house rent declaration data and create a new object
            var houserentRecordData = _context.HouseRentDeclarations.FirstOrDefault(x => x.Id == employee.HouseRentRecordId);
            HouseRentDeclaration houseRentDeclaration = new HouseRentDeclaration();

            if (houserentRecordData == null)
            {
                houseRentDeclaration = null;
            }
            else
            {
                houseRentDeclaration = new HouseRentDeclaration()
                {
                    Id = houserentRecordData.Id,
                    Amount = houserentRecordData.Amount,
                    ProofDocumentLink = houserentRecordData.ProofDocumentLink,
                    OwnerPanCard = houserentRecordData.OwnerPanCard,
                    Remarks = houserentRecordData.Remarks,
                    IsVerified = houserentRecordData.IsVerified
                };
            }

            // Fetch travel expenditure declaration data and create a new object
            var leaveTravelRecordData = _context.TravelExpenditureDeclarations.FirstOrDefault(x => x.Id == employee.TravelExpenditureRecordId);
            TravelExpenditureDeclaration travelExpenditureDeclaration = new TravelExpenditureDeclaration();
            if (leaveTravelRecordData == null)
            {
                travelExpenditureDeclaration = null;
            }
            else
            {
                travelExpenditureDeclaration = new TravelExpenditureDeclaration
                {
                    Id = leaveTravelRecordData.Id,
                    Amount = (int)leaveTravelRecordData.Amount,
                    ProofDocumentLink = leaveTravelRecordData.ProofDocumentLink,
                    Remarks = leaveTravelRecordData.Remarks,
                    IsVerified = false
                };
            }

            // Fetch home loan declaration data and create a new object
            var InterestOnHomLoanRecordData = _context.HomeLoanDeclarations.FirstOrDefault(x => x.Id == employee.HomeLoanRecordId);
            HomeLoanDeclaration homeLoanDeclaration = new HomeLoanDeclaration();
            if (InterestOnHomLoanRecordData == null)
            {
                homeLoanDeclaration = null;
            }
            else
            {
                homeLoanDeclaration = new HomeLoanDeclaration
                {
                    Id = InterestOnHomLoanRecordData.Id,
                    LenderName = InterestOnHomLoanRecordData.LenderName,
                    LenderAddress = InterestOnHomLoanRecordData.LenderAddress,
                    LenderPanNumber = InterestOnHomLoanRecordData.LenderPanNumber,
                    Amount = (int)InterestOnHomLoanRecordData.Amount,
                    ProofDocumentLink = InterestOnHomLoanRecordData.ProofDocumentLink,
                    Remarks = InterestOnHomLoanRecordData.Remarks,
                    IsVerified = false, // Assuming this needs to be updated too
                };
            }

            // Fetch and prepare 80C declarations list
            var eightyCRecordData = _context.EightyCDeclarations.Where(x => x.Employee12BBId == employee.Id && x.IsDelete == false).ToList();
            List<EightyCDeclaration> eightyCDeclarationsList = new List<EightyCDeclaration>();
            if (eightyCRecordData.Count <= 0)
            {
                eightyCDeclarationsList = null;
            }
            else
            {
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
            }

            // Fetch 80D declaration data and create a new object
            var eightyDRecordData = _context.EightyDDeclarations.FirstOrDefault(x => x.Id == employee.EightyDRecordId);
            EightyDDeclaration eightyDDeclaration = new EightyDDeclaration();
            if (eightyDRecordData == null)
            {
                eightyDRecordData = null;
            }
            else
            {
                eightyDDeclaration = new EightyDDeclaration
                {
                    Id = eightyDRecordData.Id,
                    InsuranceAmount = (int)eightyDRecordData.InsuranceAmount,
                    InsuranceProofLink = eightyDRecordData.InsuranceProofLink,
                    MedicalExpenseAmount = (int)eightyDRecordData.MedicalExpenseAmount,
                    MedicalExpenseProof = eightyDRecordData.MedicalExpenseProof,
                    Remarks = eightyDRecordData.Remarks,
                    IsVerified = false
                };
            }

            // Fetch 80G declaration data and create a new object
            var eightyGRecordData = _context.EightyGDeclarations.FirstOrDefault(x => x.Id == employee.EightyGRecordId);
            EightyGDeclaration eightyGDeclaration = new EightyGDeclaration();
            if (eightyGRecordData == null)
            {
                eightyGRecordData = null;
            }
            else
            {
                eightyGDeclaration = new EightyGDeclaration
                {
                    Id = eightyGRecordData.Id,
                    NameOfDonee = eightyGRecordData.NameOfDonee,
                    Amount = eightyGRecordData.Amount,
                    PanNumber = eightyGRecordData.PanNumber,
                    Address = eightyGRecordData.Address,
                    ProofDocumentLink = eightyGRecordData.ProofDocumentLink,
                    Remarks = eightyGRecordData.Remarks,
                    IsVerified = false
                };
            }

            // Fetch other investment declaration data and create a new object
            var otherInvestmentRecordData = _context.OtherInvestmentDeclarations.FirstOrDefault(x => x.Id == employee.OtherInvestmentRecordId);
            OtherInvestmentDeclaration otherInvestmentDeclaration = new OtherInvestmentDeclaration();
            if (otherInvestmentRecordData == null)
            {
                otherInvestmentRecordData = null;
            }
            else
            {
                otherInvestmentDeclaration = new OtherInvestmentDeclaration
                {
                    Id = otherInvestmentRecordData.Id,
                    Description = otherInvestmentRecordData.Description,
                    ProofDocumentLink = otherInvestmentRecordData.ProofDocumentLink,
                    Remarks = otherInvestmentRecordData.Remarks,
                    IsVerified = false
                };
            }

            // Create and return the final Employee12BB object
            Employee12BBDTO employee12BB = new Employee12BBDTO
            {
                Id = employee.Id,
                EmployeeId = employee.EmployeeId,

                FinancialYears = new List<FinancialYear> { financialYearData },
                HouseRentRecordId = houseRentDeclaration == null ? 0 : houseRentDeclaration.Id,
                HomeLoanRecordId = homeLoanDeclaration == null ? 0 : homeLoanDeclaration.Id,
                TravelExpenditureRecordId = travelExpenditureDeclaration == null ? 0 : travelExpenditureDeclaration.Id,
                EightyDRecordId = eightyDDeclaration == null ? 0 : eightyDDeclaration.Id,
                EightyGRecordId = eightyGDeclaration == null ? 0 : eightyGDeclaration.Id,
                OtherInvestmentRecordId = otherInvestmentDeclaration == null ? 0 : otherInvestmentDeclaration.Id,
                HouseRentRecord = houseRentDeclaration,
                TravelExpenditureRecord = travelExpenditureDeclaration,
                HomeLoanRecord = homeLoanDeclaration,
                EightyCDeclarations = eightyCDeclarationsList,
                EightyCDeductionTypes = _context.EightyCDeductionTypes.ToList(),
                EightyDRecord = eightyDDeclaration,
                EightyGRecord = eightyGDeclaration,
                OtherInvestmentRecord = otherInvestmentDeclaration
            };
            return employee12BB;
        }
        // Retrieve all Employee12BB records for a given employee
        public async Task<List<Employee12BB>> GetEmployee12BBs(string employeeId)
        {
            return _context.Employee12BBs.Where(e => e.EmployeeId == employeeId).ToList();
        }

        // Save form 12BB and return the updated DTO
        public async Task<Employee12BB> SaveEmployee12BB(Employee12BB employee12BB)
        {
            if (employee12BB == null)
            {
                throw new Exception("Invalid payload");
            }

            // Added record Ids
            var houseRentRecordId = 0;
            var travelExpenditureRecordId = 0;
            var homeLoanRecordId = 0;
            var eightyDRecordId = 0;
            var eightyGRecordId = 0;
            var otherInvestmentRecordId = 0;

            // Get employee12BB form data from DB
            var existingEmployee12BBs = _context.Employee12BBs.SingleOrDefault(x => x.Id == employee12BB.Id);

            // Update house rent declaration data if present
            if (employee12BB.HouseRentRecordId > 0)
            {
                var houseRentDeclarations = _context.HouseRentDeclarations.SingleOrDefault(x => x.Id == employee12BB.HouseRentRecordId);
                if (houseRentDeclarations == null) { }
                houseRentDeclarations.Amount = employee12BB.HouseRentRecord.Amount;
                houseRentDeclarations.OwnerPanCard = employee12BB.HouseRentRecord.OwnerPanCard;
                houseRentDeclarations.ProofDocumentLink = employee12BB.HouseRentRecord.ProofDocumentLink ?? houseRentDeclarations.ProofDocumentLink;
                houseRentDeclarations.IsVerified = employee12BB.HouseRentRecord.IsVerified;
                houseRentDeclarations.Remarks = employee12BB.HouseRentRecord.Remarks;
                _context.HouseRentDeclarations.Update(houseRentDeclarations);
                _context.SaveChanges();
            }
            else
            {
                var response = _context.HouseRentDeclarations.Add(employee12BB.HouseRentRecord);
                _context.SaveChanges();
                houseRentRecordId = response.Entity.Id;
            }

            // Update travel expenditure declaration data if present
            if (employee12BB.TravelExpenditureRecordId > 0)
            {
                var travelExpenditureDeclarations = _context.TravelExpenditureDeclarations.SingleOrDefault(x => x.Id == employee12BB.TravelExpenditureRecordId);
                if (travelExpenditureDeclarations == null) { }
                travelExpenditureDeclarations.Amount = employee12BB.TravelExpenditureRecord.Amount;
                travelExpenditureDeclarations.ProofDocumentLink = employee12BB.TravelExpenditureRecord.ProofDocumentLink ?? travelExpenditureDeclarations.ProofDocumentLink;
                travelExpenditureDeclarations.IsVerified = employee12BB.TravelExpenditureRecord.IsVerified;
                travelExpenditureDeclarations.Remarks = employee12BB.TravelExpenditureRecord.Remarks;
                _context.TravelExpenditureDeclarations.Update(travelExpenditureDeclarations);
                _context.SaveChanges();
            }
            else
            {
                var response = _context.TravelExpenditureDeclarations.Add(employee12BB.TravelExpenditureRecord);
                _context.SaveChanges();
                travelExpenditureRecordId = response.Entity.Id;
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
                homeLoanDeclarations.ProofDocumentLink = employee12BB.HomeLoanRecord.ProofDocumentLink ?? homeLoanDeclarations.ProofDocumentLink;
                homeLoanDeclarations.IsVerified = employee12BB.HomeLoanRecord.IsVerified;
                homeLoanDeclarations.Remarks = employee12BB.HomeLoanRecord.Remarks;
                _context.HomeLoanDeclarations.Update(homeLoanDeclarations);
                _context.SaveChanges();
            }
            else
            {
                var response = _context.HomeLoanDeclarations.Add(employee12BB.HomeLoanRecord);
                _context.SaveChanges();
                homeLoanRecordId = response.Entity.Id;
            }

            if (employee12BB.Id > 0)
            {
                // Fetch existing declarations from the database
                var existingEightyCDeclarations = _context.EightyCDeclarations.Where(x => x.Employee12BBId == employee12BB.Id).ToList();

                if (existingEightyCDeclarations.Count > 0)
                {
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
                            existingEightyCDeclaration.ProofDocumentLink = eightyCDeclaration.ProofDocumentLink ?? existingEightyCDeclaration.ProofDocumentLink;
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
                                ProofDocumentLink = eightyCDeclaration.ProofDocumentLink ?? null,
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
                else
                {
                    // Create a new declaration
                    var newEightyCDeclaration = new EightyCDeclaration
                    {
                        Employee12BBId = employee12BB.Id,
                        DeductionTypeId = 0,
                        Amount = 0,
                        ProofDocumentLink = null,
                        Remarks = null,
                        IsVerified = false,
                        CreatedBy = "null",
                        CreatedOn = DateTime.Now,
                        ModifiedBy = "null",
                        ModifiedOn = DateTime.Now,
                        IsDelete = false
                    };
                    _context.EightyCDeclarations.Add(newEightyCDeclaration);
                    _context.SaveChanges();
                }
            }

            // Update 80D declaration data if present
            if (employee12BB.EightyDRecordId > 0)
            {
                var eightyDDeclarations = _context.EightyDDeclarations.SingleOrDefault(x => x.Id == employee12BB.EightyDRecordId);
                if (eightyDDeclarations == null) { }
                eightyDDeclarations.InsuranceAmount = employee12BB.EightyDRecord.InsuranceAmount;
                eightyDDeclarations.InsuranceProofLink = employee12BB.EightyDRecord.InsuranceProofLink ?? eightyDDeclarations.InsuranceProofLink;
                eightyDDeclarations.MedicalExpenseAmount = employee12BB.EightyDRecord.MedicalExpenseAmount;
                eightyDDeclarations.MedicalExpenseProof = employee12BB.EightyDRecord.MedicalExpenseProof ?? eightyDDeclarations.MedicalExpenseProof;
                eightyDDeclarations.IsVerified = employee12BB.EightyDRecord.IsVerified;
                eightyDDeclarations.Remarks = employee12BB.EightyDRecord.Remarks;
                _context.EightyDDeclarations.Update(eightyDDeclarations);
                _context.SaveChanges();
            }
            else
            {
                employee12BB.EightyDRecord.InsuranceAmount = employee12BB.EightyDRecord.InsuranceAmount ?? 0;
                employee12BB.EightyDRecord.MedicalExpenseAmount = employee12BB.EightyDRecord.MedicalExpenseAmount ?? 0;
                var response = _context.EightyDDeclarations.Add(employee12BB.EightyDRecord);
                _context.SaveChanges();
                eightyDRecordId = response.Entity.Id;
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
                eightyGDeclarations.ProofDocumentLink = employee12BB.EightyGRecord.ProofDocumentLink ?? eightyGDeclarations.ProofDocumentLink;
                eightyGDeclarations.IsVerified = employee12BB.EightyGRecord.IsVerified;
                eightyGDeclarations.Remarks = employee12BB.EightyGRecord.Remarks;
                _context.EightyGDeclarations.Update(eightyGDeclarations);
                _context.SaveChanges();
            }
            else
            {
                employee12BB.EightyGRecord.Amount = employee12BB.EightyGRecord.Amount ?? 0;
                var response = _context.EightyGDeclarations.Add(employee12BB.EightyGRecord);
                _context.SaveChanges();
                eightyGRecordId = response.Entity.Id;
            }

            // Update other investment declaration data if present
            if (employee12BB.OtherInvestmentRecordId > 0)
            {
                var otherInvestmentDeclarations = _context.OtherInvestmentDeclarations.SingleOrDefault(x => x.Id == employee12BB.OtherInvestmentRecordId);
                if (otherInvestmentDeclarations == null) { }
                otherInvestmentDeclarations.Description = employee12BB.OtherInvestmentRecord.Description;
                otherInvestmentDeclarations.ProofDocumentLink = employee12BB.OtherInvestmentRecord.ProofDocumentLink ?? otherInvestmentDeclarations.ProofDocumentLink;
                otherInvestmentDeclarations.IsVerified = employee12BB.OtherInvestmentRecord.IsVerified;
                otherInvestmentDeclarations.Remarks = employee12BB.OtherInvestmentRecord.Remarks;
                _context.OtherInvestmentDeclarations.Update(otherInvestmentDeclarations);
                _context.SaveChanges();
            }
            else
            {
                var response = _context.OtherInvestmentDeclarations.Add(employee12BB.OtherInvestmentRecord);
                _context.SaveChanges();
                otherInvestmentRecordId = response.Entity.Id;
            }


            // Update the main Employee12BB form
            existingEmployee12BBs.EmployeeId = employee12BB.EmployeeId;
            existingEmployee12BBs.FinancialYears = employee12BB.FinancialYears;
            //existingEmployee12BBs.FinancialYear = employee12BB.FinancialYear;
            existingEmployee12BBs.HouseRentRecordId = employee12BB.HouseRentRecordId == 0 ? houseRentRecordId : employee12BB.HouseRentRecordId;
            existingEmployee12BBs.TravelExpenditureRecordId = employee12BB.TravelExpenditureRecordId == 0 ? travelExpenditureRecordId : employee12BB.TravelExpenditureRecordId;
            existingEmployee12BBs.HomeLoanRecordId = employee12BB.HomeLoanRecordId == 0 ? homeLoanRecordId : employee12BB.HomeLoanRecordId;
            existingEmployee12BBs.EightyDRecordId = employee12BB.EightyDRecordId == 0 ? eightyDRecordId : employee12BB.EightyDRecordId;
            existingEmployee12BBs.EightyGRecordId = employee12BB.EightyGRecordId == 0 ? eightyGRecordId : employee12BB.EightyGRecordId;
            existingEmployee12BBs.OtherInvestmentRecordId = employee12BB.OtherInvestmentRecordId == 0 ? otherInvestmentRecordId : employee12BB.OtherInvestmentRecordId;
            existingEmployee12BBs.ModifiedBy = employee12BB.ModifiedBy;
            existingEmployee12BBs.ModifiedOn = DateTime.Now;
            existingEmployee12BBs.IsDelete = employee12BB.IsDelete;
            existingEmployee12BBs.IsActive = employee12BB.IsActive;
            existingEmployee12BBs.IsFormVerified = employee12BB.IsFormVerified;
            existingEmployee12BBs.IsDeclarationComplete = employee12BB.IsDeclarationComplete;

            _context.Employee12BBs.Update(existingEmployee12BBs);
            var result = await _context.SaveChangesAsync();
            if (result <= 0)
            {
                throw new Exception("Unable to update data");
            }

            var employee12BBDto = new Employee12BB
            {
                //Id = employee12BB.Id,
                EmployeeId = existingEmployee12BBs.EmployeeId,
                FinancialYears = existingEmployee12BBs.FinancialYears,
                
                HouseRentRecordId = existingEmployee12BBs.HouseRentRecordId == 0 ? houseRentRecordId : existingEmployee12BBs.HouseRentRecordId,
                TravelExpenditureRecordId = existingEmployee12BBs.TravelExpenditureRecordId == 0 ? travelExpenditureRecordId : existingEmployee12BBs.TravelExpenditureRecordId,
                HomeLoanRecordId = existingEmployee12BBs.HomeLoanRecordId == 0 ? homeLoanRecordId : existingEmployee12BBs.HomeLoanRecordId,
                EightyDRecordId = existingEmployee12BBs.EightyDRecordId == 0 ? eightyDRecordId : existingEmployee12BBs.EightyDRecordId,
                EightyGRecordId = existingEmployee12BBs.EightyGRecordId == 0 ? eightyGRecordId : existingEmployee12BBs.EightyGRecordId,
                OtherInvestmentRecordId = existingEmployee12BBs.OtherInvestmentRecordId == 0 ? otherInvestmentRecordId : existingEmployee12BBs.OtherInvestmentRecordId,
                ModifiedBy = existingEmployee12BBs.ModifiedBy,
                ModifiedOn = DateTime.Now,
                IsDelete = existingEmployee12BBs.IsDelete,
                IsActive = existingEmployee12BBs.IsActive,
                IsFormVerified = existingEmployee12BBs.IsFormVerified,
                IsDeclarationComplete = existingEmployee12BBs.IsDeclarationComplete
            };

            return employee12BBDto;
        }

        public async Task<List<DocumentPaths>> UploadDocumentProofs(IFormCollection formCollection)
        {
            // Extract files
            var files = formCollection.Files;
            if (files == null || files.Count == 0)
                throw new ArgumentNullException(nameof(files), "ProofDocumentLink is required");

            // Extract sections and field names
            var sections = formCollection.Where(kvp => kvp.Key.Contains("section")).Select(kvp => kvp.Value.ToString()).ToList();
            var fieldNames = formCollection.Where(kvp => kvp.Key.Contains("fieldName")).Select(kvp => kvp.Value.ToString()).ToList();

            var documentProofs = new List<DocumentPaths>();

            // Process each file along with its section and field name
            foreach (var file in files)
            {
                var fileIndex = int.Parse(file.Name.Split('[')[1].Split(']')[0]);
                var section = sections[fileIndex];
                var fieldName = fieldNames[fileIndex];

                var subFolder = char.ToUpper(section[0]) + section.Substring(1) + " Proofs";
                string fullPath = "";
                string fileName = "";

                if (section == DeclarationConstants.Eighty_D_Record)
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

                documentProofs.Add(new DocumentPaths
                {
                    FileIndex = fileIndex,
                    Section = section,
                    FieldName = fieldName,
                    FullPath = fullPath
                });
            }
            return documentProofs;
        }


        public async Task<int> InsertEmployeeRecordAsync(Employee12BBDTO employeeRecordDto)
        {
            var employeeRecord = new Employee12BB
            {
                EmployeeId = employeeRecordDto.EmployeeId,
                FinancialYears = employeeRecordDto.FinancialYears,
                //FinancialYear = employeeRecordDto.FinancialYear,
                HouseRentRecordId = employeeRecordDto.HouseRentRecordId,
                TravelExpenditureRecordId = employeeRecordDto.TravelExpenditureRecordId,
                HomeLoanRecordId = employeeRecordDto.HomeLoanRecordId,
                EightyDRecordId = employeeRecordDto.EightyDRecordId,
                EightyGRecordId = employeeRecordDto.EightyGRecordId,
                OtherInvestmentRecordId = employeeRecordDto.OtherInvestmentRecordId,
                CreatedBy = employeeRecordDto.CreatedBy,
                CreatedOn = DateTime.Now,
                ModifiedBy = employeeRecordDto.ModifiedBy,
                ModifiedOn = DateTime.Now,
                IsDelete = employeeRecordDto.IsDelete,
                IsActive = employeeRecordDto.IsActive,
                IsFormVerified = employeeRecordDto.IsFormVerified,
                IsDeclarationComplete = employeeRecordDto.IsDeclarationComplete
            };

            _context.Employee12BBs.Add(employeeRecord);
            return await _context.SaveChangesAsync();
        }

        public async Task<List<ManageTaxes12BBDTO>> GetManageTaxes12BB(string? searchQuery, int? pageNumber, int? pageSize)
        {
            try
            {
                var query = from emp in _context.Employees
                            join bb in _context.Employee12BBs
                                on emp.EmployeeId equals bb.EmployeeId into employeeBBs
                            from bb in employeeBBs.DefaultIfEmpty()
                                //where bb == null || bb.IsDeclarationComplete
                            where (bb != null && bb.IsDeclarationComplete && bb.ModifiedOn != null)
                            select new ManageTaxes12BBDTO
                            {
                                EmployeeId = emp.EmployeeId,
                                EmpCode = emp.EmpCode, 
                                Name = emp.Name,
                                ContactNumber = emp.ContactNumber1,
                                Email = emp.PersonalEmailId, // Assuming PersonalEmailId is a property on Employee
                                IsDeclarationComplete = bb != null && bb.IsDeclarationComplete,
                                SubmittedOn = bb != null && bb.IsDeclarationComplete ? bb.ModifiedOn : null
                                
                            };

                // Apply search filter
                if (!string.IsNullOrEmpty(searchQuery))
                {
                    query = query.Where(mt => mt.Name.Contains(searchQuery) ||
                                              mt.EmpCode.Contains(searchQuery));
                                             
                }

                // Count the total number of records after applying the search filter
                var usersCount = await query.CountAsync();

                // Apply pagination
                var manageTaxes = await query.OrderByDescending(u => u.EmpCode) // Order by EmpCode in descending order
                                             .Skip(pageNumber.HasValue && pageSize.HasValue ? (pageNumber.Value - 1) * pageSize.Value : 0)
                                             .Take(pageSize ?? 10)
                                             .ToListAsync();

                // Set the UserCount for each DTO
                manageTaxes.ForEach(mt => mt.UserCount = usersCount);

                return manageTaxes;
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching users.", ex);
            }
        }

    }
}