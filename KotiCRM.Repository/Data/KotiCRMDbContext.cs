﻿using KotiCRM.Repository.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Task = KotiCRM.Repository.Models.Task;

namespace KotiCRM.Repository.Data
{
    public class KotiCRMDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {

        public KotiCRMDbContext(DbContextOptions<KotiCRMDbContext> options) : base(options)
        {
        }
        public DbSet<Permissions> Permissions { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Industry> Industry { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }
        public DbSet<Note> Notes { get; set; }

        // Tax

        public DbSet<Employee12BB> Employee12BBs { get; set; }
        public DbSet<HouseRentDeclaration> HouseRentDeclarations { get; set; }
        public DbSet<TravelExpenditureDeclaration> TravelExpenditureDeclarations { get; set; }
        public DbSet<HomeLoanDeclaration> HomeLoanDeclarations { get; set; }
        public DbSet<EightyDDeclaration> EightyDDeclarations { get; set; }
        public DbSet<EightyGDeclaration> EightyGDeclarations { get; set; }
        public DbSet<OtherInvestmentDeclaration> OtherInvestmentDeclarations { get; set; }
        public DbSet<EightyCDeclaration> EightyCDeclarations { get; set; }
        public DbSet<EightyCDeductionType> EightyCDeductionTypes { get; set; }

        public virtual DbSet<Bank> Banks { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<DefaultColumn> DefaultColumns { get; set; }

        public virtual DbSet<Department> Departments { get; set; }

        public virtual DbSet<Designation> Designations { get; set; }

        public virtual DbSet<Employee> Employees { get; set; }

        public virtual DbSet<EmployeeAppraisal> EmployeeAppraisals { get; set; }

        public virtual DbSet<EmployeeLeaf> EmployeeLeaves { get; set; }

        // public virtual DbSet<EmployeeRole> EmployeeRoles { get; set; }

        public virtual DbSet<ImportHistory> ImportHistories { get; set; }
        public virtual DbSet<LeaveApplication> LeaveApplications { get; set; }

        public virtual DbSet<LeaveNotification> LeaveNotifications { get; set; }

        public virtual DbSet<LeaveSetting> LeaveSettings { get; set; }

        public virtual DbSet<LeaveType> LeaveTypes { get; set; }

        public virtual DbSet<LiveUpdate> LiveUpdates { get; set; }
        public virtual DbSet<Organization> Organizations { get; set; }

        public virtual DbSet<ProcessedFile> ProcessedFiles { get; set; }

        public virtual DbSet<Project> Projects { get; set; }

        public virtual DbSet<ProjectStatus> ProjectStatuses { get; set; }

        public virtual DbSet<ProjectTeam> ProjectTeams { get; set; }

        public virtual DbSet<ProjectTimesheetInterval> ProjectTimesheetIntervals { get; set; }

        public virtual DbSet<ReaderData> ReaderData { get; set; }

        public virtual DbSet<Readerdatum> Readerdata { get; set; }

        public virtual DbSet<ScreenShot> ScreenShots { get; set; }

        public virtual DbSet<Shift> Shifts { get; set; }

        public virtual DbSet<Task> Tasks { get; set; }

        public virtual DbSet<TaskMember> TaskMembers { get; set; }

        public virtual DbSet<TimeLog> TimeLogs { get; set; }

        public virtual DbSet<Timesheet> Timesheets { get; set; }

        public virtual DbSet<UserLeave> UserLeaves { get; set; }

        public virtual DbSet<WorkLog> WorkLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Attachment>(entity =>
            {
                entity.HasKey(e => e.ID);

                entity.Property(e => e.ID).HasColumnName("AttachmentID");
                entity.Property(e => e.UserID).IsRequired();
                entity.Property(e => e.FileSize).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.FileName).HasMaxLength(250).IsRequired();
                entity.Property(e => e.FileExtension).HasMaxLength(50).IsRequired();
            });

            modelBuilder.Entity<Bank>(entity =>
            {
                entity.HasKey(e => e.BankId);

                entity.ToTable("Bank");

                entity.Property(e => e.BankAccountNumber)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .IsRequired(false);
                entity.Property(e => e.Branch)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.Ifsc)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("IFSC");
                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);
                entity.Property(e => e.OrganizationId).HasColumnName("OrganizationID");
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("Company");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("ContactId");
                entity.Property(e => e.OwnerId).HasMaxLength(200).IsRequired();
                entity.Property(e => e.FirstName).HasMaxLength(200).IsRequired();
                entity.Property(e => e.LastName).HasMaxLength(200).IsRequired();
                entity.Property(e => e.AccountID).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(100).IsRequired();
                entity.Property(e => e.Phone).HasMaxLength(20);
                entity.Property(e => e.OtherPhone).HasMaxLength(20);
                entity.Property(e => e.Mobile).HasMaxLength(20).IsRequired();
                entity.Property(e => e.Title).HasMaxLength(200);
                entity.Property(e => e.Department).HasMaxLength(200);
                entity.Property(e => e.DateOfBirth).HasColumnType("date");
                entity.Property(e => e.HomePhone).HasMaxLength(20);
                entity.Property(e => e.SkypeID).HasMaxLength(200);
                entity.Property(e => e.LinkedinURL).HasMaxLength(200);
                entity.Property(e => e.TwitterURL).HasMaxLength(200);
                entity.Property(e => e.SecondaryEmail).HasMaxLength(100);
                entity.Property(e => e.MailingStreet).HasMaxLength(200);
                entity.Property(e => e.City).HasMaxLength(100);
                entity.Property(e => e.State).HasMaxLength(100);
                entity.Property(e => e.ZipCode).HasMaxLength(100);
                entity.Property(e => e.Country).HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(450);

                entity.HasOne(e => e.Account)
                    .WithMany()
                    .HasForeignKey(e => e.AccountID);
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasKey(e => e.DepartmentId).HasName("PK_Table_1");

                entity.ToTable("Department");

                entity.Property(e => e.DepartmentId).ValueGeneratedNever();
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.OrganizationId).HasColumnName("OrganizationID");

                //entity.HasOne(d => d.Organization).WithMany(p => p.Departments)
                //    .HasForeignKey(d => d.OrganizationId)
                //    .HasConstraintName("FK_Department_Organization");
            });

            modelBuilder.Entity<Designation>(entity =>
            {
                entity.ToTable("Designation");

                entity.Property(e => e.DesignationId).ValueGeneratedNever();
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.OrganizationId).HasColumnName("OrganizationID");

                //entity.HasOne(d => d.Organization).WithMany(p => p.Designations)
                //    .HasForeignKey(d => d.OrganizationId)
                //    .HasConstraintName("FK_Designation_Organization");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.EmployeeId);

                entity.ToTable("Employee");

                entity.Property(e => e.EmployeeId)
                .HasMaxLength(50)
                .IsUnicode(false);

                entity.Property(e => e.EmpCode)
                    .HasMaxLength(255);

                entity.Property(e => e.UserId)
                    .HasMaxLength(255);

                entity.Property(e => e.Name)
                    .HasMaxLength(255);

                entity.Property(e => e.ProfilePictureURL)
                    .HasMaxLength(255);

                entity.Property(e => e.FatherName)
                    .HasMaxLength(255);

                entity.Property(e => e.GuardianName)
                    .HasMaxLength(255);

                entity.Property(e => e.BloodGroup)
                    .HasMaxLength(10);

                entity.Property(e => e.ContactNumber1)
                    .HasMaxLength(15);

                entity.Property(e => e.ContactNumber2)
                    .HasMaxLength(15);

                entity.Property(e => e.GuardianContactNumber)
                    .HasMaxLength(15);

                entity.Property(e => e.PersonalEmailId)
                    .HasMaxLength(255);

                entity.Property(e => e.OfficialEmailId)
                    .HasMaxLength(255);

                entity.Property(e => e.OfficialEmailPassword)
                    .HasMaxLength(255);

                entity.Property(e => e.SkypeId)
                    .HasMaxLength(100);

                entity.Property(e => e.AdharCardNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PanNumber)
                    .HasMaxLength(10);

                entity.Property(e => e.BankId)
                    .HasMaxLength(20);

                entity.Property(e => e.PermanentAddress)
                    .HasMaxLength(500);

                entity.Property(e => e.CorrespondenceAddress)
                    .HasMaxLength(500);

                entity.HasOne(d => d.Bank).WithMany(p => p.Employees)
                    .HasForeignKey(d => d.BankId)
                    .HasConstraintName("FK_Employee_Bank");

                entity.HasOne(d => d.Company).WithMany(p => p.Employees)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Employee_Company");

                entity.HasOne(d => d.Department).WithMany(p => p.Employees)
                    .HasForeignKey(d => d.DepartmentId)
                    .HasConstraintName("FK_Employee_Department");

                entity.HasOne(d => d.Designation).WithMany(p => p.Employees)
                    .HasForeignKey(d => d.DesignationId)
                    .HasConstraintName("FK_Employee_Designation");

                entity.HasOne(d => d.Shift).WithMany(p => p.Employees)
                    .HasForeignKey(d => d.ShiftId)
                    .HasConstraintName("FK_Employee_Shift");
            });


            modelBuilder.Entity<EmployeeAppraisal>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.AppraisalDate).HasColumnType("datetime");
                entity.Property(e => e.EmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<EmployeeLeaf>(entity =>
            {
                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");
                entity.Property(e => e.ApprovedByEmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.Description).HasColumnType("text");
                entity.Property(e => e.EmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.EmpCodeAppliedByName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.RejectedByEmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            //modelBuilder.Entity<EmployeeRole>(entity =>
            //{
            //    entity.HasKey(e => e.RoleId);

            //    entity.Property(e => e.RoleId).ValueGeneratedNever();
            //    entity.Property(e => e.Description)
            //        .HasMaxLength(255)
            //        .IsUnicode(false);
            //    entity.Property(e => e.Name)
            //        .HasMaxLength(50)
            //        .IsUnicode(false);
            //});

            modelBuilder.Entity<ImportHistory>(entity =>
            {
                entity.ToTable("ImportHistory");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.EmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
            modelBuilder.Entity<LeaveApplication>(entity =>
            {
                entity.ToTable("LeaveApplication");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");
                entity.Property(e => e.EmpCodeAppliedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.EmpCodeAppliedByName)
                    .HasMaxLength(50)
                    .IsFixedLength();
                entity.Property(e => e.EmpCodeAppliedTo)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.EmpCodeAppliedToName)
                    .HasMaxLength(50)
                    .IsFixedLength();
                entity.Property(e => e.FkEmployeeLeavesId).HasColumnName("FkEmployeeLeavesID");
            });

            modelBuilder.Entity<LeaveNotification>(entity =>
            {
                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");
                entity.Property(e => e.AdminNotificationDescription).HasColumnType("text");
                entity.Property(e => e.AppliedDate)
                    .HasMaxLength(15)
                    .IsUnicode(false);
                entity.Property(e => e.AppliedTime)
                    .HasMaxLength(15)
                    .IsUnicode(false);
                entity.Property(e => e.ApplierNotificationDescription).HasColumnType("text");
                entity.Property(e => e.ManagerNotificationDescription).HasColumnType("text");
                entity.Property(e => e.SentByEmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.SentByName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.SentToEmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.SentToName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LeaveSetting>(entity =>
            {
                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");
            });

            modelBuilder.Entity<LeaveType>(entity =>
            {
                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");
                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LiveUpdate>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__LiveUpda__3214EC0756D54FC0");

                entity.Property(e => e.Description).HasMaxLength(10);
                entity.Property(e => e.Title)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });
            modelBuilder.Entity<Organization>(entity =>
            {
                entity.ToTable("Organization");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("OrganizationID");
                entity.Property(e => e.Currency).HasMaxLength(50);
                entity.Property(e => e.OrgName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.TimeZone)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.BillingStreet).HasMaxLength(100);
                entity.Property(e => e.BillingCity).HasMaxLength(100);
                entity.Property(e => e.BillingState).HasMaxLength(100);
                entity.Property(e => e.ZipCode).HasMaxLength(100);
                entity.Property(e => e.BillingCountry).HasMaxLength(100);
            });
            modelBuilder.Entity<ProcessedFile>(entity =>
            {
                entity.ToTable("ProcessedFile");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.Filename)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .IsUnicode(false);
                entity.Property(e => e.EstimatedBudget).HasColumnType("numeric(18, 0)");
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.OrganizationId).HasColumnName("OrganizationID");
            });

            modelBuilder.Entity<ProjectStatus>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("ProjectStatus");

                entity.Property(e => e.OrganizationId).HasColumnName("OrganizationID");
                entity.Property(e => e.StatusId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("StatusID");
                entity.Property(e => e.StatusType)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ProjectTeam>(entity =>
            {
                entity.HasKey(e => e.MemeberId).HasName("PK__ProjectT__560EC19CBC304D1C");

                entity.ToTable("ProjectTeam");

                entity.Property(e => e.MemeberId).HasColumnName("MemeberID");
                entity.Property(e => e.EmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.ProjectId).HasColumnName("ProjectID");

                entity.HasOne(d => d.Project).WithMany(p => p.ProjectTeams)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProjectTe__Proje__1A9EF37A");
            });

            modelBuilder.Entity<ProjectTimesheetInterval>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("ProjectTimesheetInterval");

                entity.Property(e => e.OrganizationId).HasColumnName("OrganizationID");
                entity.Property(e => e.TimesheetIntervalId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("TimesheetIntervalID");
                entity.Property(e => e.TimesheetType)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ReaderData>(entity =>
            {
                entity.ToTable("ReaderData");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.EmployeeId)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.ReadingData).HasColumnType("datetime");
            });

            modelBuilder.Entity<Readerdatum>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("_readerdata");

                entity.Property(e => e.Empid)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .HasColumnName("empid");
                entity.Property(e => e.Empname)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("empname");
                entity.Property(e => e.HalfDays)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.Hours).HasColumnType("datetime");
                entity.Property(e => e.ShortLeaves)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e._20200201)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-01");
                entity.Property(e => e._20200202)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-02");
                entity.Property(e => e._20200203)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-03");
                entity.Property(e => e._20200204)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-04");
                entity.Property(e => e._20200205)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-05");
                entity.Property(e => e._20200206)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-06");
                entity.Property(e => e._20200207)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-07");
                entity.Property(e => e._20200208)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-08");
                entity.Property(e => e._20200209)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-09");
                entity.Property(e => e._20200210)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-10");
                entity.Property(e => e._20200211)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-11");
                entity.Property(e => e._20200212)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-12");
                entity.Property(e => e._20200213)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-13");
                entity.Property(e => e._20200214)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-14");
                entity.Property(e => e._20200215)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-15");
                entity.Property(e => e._20200216)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-16");
                entity.Property(e => e._20200217)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-17");
                entity.Property(e => e._20200218)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-18");
                entity.Property(e => e._20200219)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-19");
                entity.Property(e => e._20200220)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-20");
                entity.Property(e => e._20200221)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-21");
                entity.Property(e => e._20200222)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-22");
                entity.Property(e => e._20200223)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-23");
                entity.Property(e => e._20200224)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-24");
                entity.Property(e => e._20200225)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-25");
                entity.Property(e => e._20200226)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-26");
                entity.Property(e => e._20200227)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-27");
                entity.Property(e => e._20200228)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-28");
                entity.Property(e => e._20200229)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("2020-02-29");
            });

            modelBuilder.Entity<ScreenShot>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.DateOfScreenshot)
                    .HasDefaultValueSql("(getutcdate())")
                    .HasColumnType("datetime");
                entity.Property(e => e.EmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.ImageName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.ManualTime)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.OrganizationId).HasColumnName("OrganizationID");
                entity.Property(e => e.WindowTitles).HasMaxLength(2000);
            });

            modelBuilder.Entity<Shift>(entity =>
            {
                entity.ToTable("Shift");

                entity.Property(e => e.ShiftId).ValueGeneratedNever();
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.OrganizationId).HasColumnName("OrganizationID");
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.Project).WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_Tasks_Projects");
            });

            modelBuilder.Entity<TaskMember>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.EmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.TaskId).HasColumnName("TaskID");
            });

            modelBuilder.Entity<TimeLog>(entity =>
            {
                entity.ToTable("TimeLog");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.EmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.LoginTime).HasColumnType("datetime");
                entity.Property(e => e.LogoutTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<Timesheet>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.BudgetConsumed).HasColumnType("numeric(18, 0)");
                entity.Property(e => e.EmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.ProjectId).HasColumnName("ProjectID");
            });

            modelBuilder.Entity<UserLeave>(entity =>
            {
                entity.HasKey(e => e.LeaveId);

                entity.ToTable("UserLeave");

                entity.Property(e => e.EmployeeId)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.LeaveApproval)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.ReasonForLeave).IsUnicode(false);
            });

            modelBuilder.Entity<WorkLog>(entity =>
            {
                entity.ToTable("WorkLog");

                entity.Property(e => e.EmployeeCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            // Tax module

            modelBuilder.Entity<Employee12BB>(entity =>
            {
                entity.HasKey(e => e.Id);

                
                entity.Property(e => e.EmployeeId)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FinancialYear)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedOn)
                    .IsRequired();

                entity.Property(e => e.ModifiedBy)
                    .IsRequired(false)
                    .HasMaxLength(50);

                entity.Property(e => e.ModifiedOn)
                    .IsRequired(false);

                entity.Property(e => e.IsDelete)
                    .IsRequired();

                entity.Property(e => e.IsActive)
                    .IsRequired();

                entity.Property(e => e.IsFormVerified)
                    .IsRequired();

                entity.Property(e => e.IsDeclarationComplete)
                    .IsRequired();

                entity.HasOne(e => e.Employee)
                    .WithMany(e => e.Employee12BBs)
                    .HasForeignKey(e => e.EmployeeId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.HouseRentRecord)
                    .WithMany()
                    .HasForeignKey(e => e.HouseRentRecordId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.TravelExpenditureRecord)
                    .WithMany()
                    .HasForeignKey(e => e.TravelExpenditureRecordId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.HomeLoanRecord)
                    .WithMany()
                    .HasForeignKey(e => e.HomeLoanRecordId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.EightyDRecord)
                    .WithMany()
                    .HasForeignKey(e => e.EightyDRecordId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.EightyGRecord)
                    .WithMany()
                    .HasForeignKey(e => e.EightyGRecordId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.OtherInvestmentRecord)
                    .WithMany()
                    .HasForeignKey(e => e.OtherInvestmentRecordId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<HouseRentDeclaration>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Amount)
                    .IsRequired();

                entity.Property(e => e.OwnerPanCard)
                    .HasMaxLength(50);

                entity.Property(e => e.ProofDocumentLink)
                    .HasMaxLength(255);

                entity.Property(e => e.IsVerified)
                    .IsRequired();

                entity.Property(e => e.Remarks)
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<TravelExpenditureDeclaration>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Amount)
                    .IsRequired();

                entity.Property(e => e.ProofDocumentLink)
                    .HasMaxLength(255);

                entity.Property(e => e.IsVerified)
                    .IsRequired();

                entity.Property(e => e.Remarks)
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<HomeLoanDeclaration>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.LenderName)
                    .HasMaxLength(100);

                entity.Property(e => e.LenderAddress)
                    .HasMaxLength(255);

                entity.Property(e => e.LenderPanNumber)
                    .HasMaxLength(50);

                entity.Property(e => e.Amount)
                    .IsRequired();

                entity.Property(e => e.ProofDocumentLink)
                    .HasMaxLength(255);

                entity.Property(e => e.IsVerified)
                    .IsRequired();

                entity.Property(e => e.Remarks)
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<EightyDDeclaration>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.InsuranceAmount)
                    .IsRequired();

                entity.Property(e => e.InsuranceProofLink)
                    .HasMaxLength(255);

                entity.Property(e => e.MedicalExpenseAmount)
                    .IsRequired();

                entity.Property(e => e.MedicalExpenseProof)
                    .HasMaxLength(255);

                entity.Property(e => e.IsVerified)
                    .IsRequired();

                entity.Property(e => e.Remarks)
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<EightyGDeclaration>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.NameOfDonee)
                    .HasMaxLength(100);

                entity.Property(e => e.PanNumber)
                    .HasMaxLength(50);

                entity.Property(e => e.Address)
                    .HasMaxLength(255);

                entity.Property(e => e.Amount)
                    .IsRequired();

                entity.Property(e => e.ProofDocumentLink)
                    .HasMaxLength(255);

                entity.Property(e => e.IsVerified)
                    .IsRequired();

                entity.Property(e => e.Remarks)
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<OtherInvestmentDeclaration>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Description)
                    .HasMaxLength(255);

                entity.Property(e => e.ProofDocumentLink)
                    .HasMaxLength(255);

                entity.Property(e => e.IsVerified)
                    .IsRequired();

                entity.Property(e => e.Remarks)
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<EightyCDeclaration>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.DeductionTypeId)
                    .IsRequired();

                entity.Property(e => e.Amount)
                    .IsRequired();

                entity.Property(e => e.ProofDocumentLink)
                    .HasMaxLength(255);

                entity.Property(e => e.IsVerified)
                    .IsRequired();

                entity.Property(e => e.Remarks)
                    .HasMaxLength(500);

                entity.Property(e => e.Employee12BBId)
                    .IsRequired();

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedOn)
                    .IsRequired();

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50);

                entity.Property(e => e.ModifiedOn)
                    .IsRequired();

                entity.Property(e => e.IsDelete)
                    .IsRequired();
            });

            modelBuilder.Entity<EightyCDeductionType>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}