using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DealName",
                table: "Invoices",
                type: "nvarchar(200)",
                nullable: true);
        
        migrationBuilder.CreateTable(
            name: "_readerdata",
                columns: table => new
                {
                    empid = table.Column<string>(type: "varchar(8)", unicode: false, maxLength: 8, nullable: true),
                    empname = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    _20200201 = table.Column<string>(name: "2020-02-01", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200202 = table.Column<string>(name: "2020-02-02", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200203 = table.Column<string>(name: "2020-02-03", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200204 = table.Column<string>(name: "2020-02-04", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200205 = table.Column<string>(name: "2020-02-05", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200206 = table.Column<string>(name: "2020-02-06", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200207 = table.Column<string>(name: "2020-02-07", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200208 = table.Column<string>(name: "2020-02-08", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200209 = table.Column<string>(name: "2020-02-09", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200210 = table.Column<string>(name: "2020-02-10", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200211 = table.Column<string>(name: "2020-02-11", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200212 = table.Column<string>(name: "2020-02-12", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200213 = table.Column<string>(name: "2020-02-13", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200214 = table.Column<string>(name: "2020-02-14", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200215 = table.Column<string>(name: "2020-02-15", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200216 = table.Column<string>(name: "2020-02-16", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200217 = table.Column<string>(name: "2020-02-17", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200218 = table.Column<string>(name: "2020-02-18", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200219 = table.Column<string>(name: "2020-02-19", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200220 = table.Column<string>(name: "2020-02-20", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200221 = table.Column<string>(name: "2020-02-21", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200222 = table.Column<string>(name: "2020-02-22", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200223 = table.Column<string>(name: "2020-02-23", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200224 = table.Column<string>(name: "2020-02-24", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200225 = table.Column<string>(name: "2020-02-25", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200226 = table.Column<string>(name: "2020-02-26", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200227 = table.Column<string>(name: "2020-02-27", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200228 = table.Column<string>(name: "2020-02-28", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    _20200229 = table.Column<string>(name: "2020-02-29", type: "varchar(40)", unicode: false, maxLength: 40, nullable: true),
                    Hours = table.Column<DateTime>(type: "datetime", nullable: true),
                    ShortLeaves = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    HalfDays = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                });

migrationBuilder.CreateTable(
    name: "Bank",
    columns: table => new
    {
        BankID = table.Column<int>(type: "int", nullable: false),
        Name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
        Branch = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        IFSC = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        OrganizationID = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Bank", x => x.BankID);
    });

migrationBuilder.CreateTable(
    name: "Company",
    columns: table => new
    {
        CompanyId = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Company", x => x.CompanyId);
    });

migrationBuilder.CreateTable(
    name: "DefaultColumns",
    columns: table => new
    {
        Id = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        ColumnName = table.Column<string>(type: "nvarchar(max)", nullable: true),
        Entity = table.Column<string>(type: "nvarchar(max)", nullable: true),
        OrgId = table.Column<int>(type: "int", nullable: true),
        IsEditable = table.Column<bool>(type: "bit", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_DefaultColumns", x => x.Id);
    });

migrationBuilder.CreateTable(
    name: "EmployeeAppraisals",
    columns: table => new
    {
        ID = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        EmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        CurrentDesignation = table.Column<int>(type: "int", nullable: true),
        NewDesignation = table.Column<int>(type: "int", nullable: true),
        CurrentSalary = table.Column<int>(type: "int", nullable: true),
        NewSalary = table.Column<int>(type: "int", nullable: true),
        AppraisalDate = table.Column<DateTime>(type: "datetime", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_EmployeeAppraisals", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "EmployeeLeaves",
    columns: table => new
    {
        ID = table.Column<int>(type: "int", nullable: false),
        EmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
        EmpCodeAppliedByName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
        TypeOfLeave = table.Column<int>(type: "int", nullable: false),
        FromDate = table.Column<DateOnly>(type: "date", nullable: true),
        ToDate = table.Column<DateOnly>(type: "date", nullable: true),
        Status = table.Column<int>(type: "int", nullable: true),
        Description = table.Column<string>(type: "text", nullable: false),
        ApprovedByEmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        RejectedByEmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_EmployeeLeaves", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "EmployeeRoles",
    columns: table => new
    {
        RoleId = table.Column<int>(type: "int", nullable: false),
        Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        Description = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_EmployeeRoles", x => x.RoleId);
    });

migrationBuilder.CreateTable(
    name: "ImportHistory",
    columns: table => new
    {
        Id = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        EmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
        ImportedDataDate = table.Column<DateOnly>(type: "date", nullable: false)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_ImportHistory", x => x.Id);
    });

migrationBuilder.CreateTable(
    name: "LeaveApplication",
    columns: table => new
    {
        ID = table.Column<int>(type: "int", nullable: false),
        EmployeeLeaves = table.Column<int>(type: "int", nullable: true),
        EmpCodeAppliedToName = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: true),
        EmpCodeAppliedTo = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        EmpCodeAppliedByName = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: true),
        EmpCodeAppliedBy = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
        TypeOfLeave = table.Column<int>(type: "int", nullable: false),
        FkEmployeeLeavesID = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_LeaveApplication", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "LeaveNotifications",
    columns: table => new
    {
        ID = table.Column<int>(type: "int", nullable: false),
        AppliedDate = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
        AppliedTime = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
        SentByEmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
        SentByName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
        SentToEmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
        SentToName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
        Viewed = table.Column<int>(type: "int", nullable: false),
        AdminNotificationDescription = table.Column<string>(type: "text", nullable: true),
        ApplierNotificationDescription = table.Column<string>(type: "text", nullable: true),
        ManagerNotificationDescription = table.Column<string>(type: "text", nullable: true),
        IsManager = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_LeaveNotifications", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "LeaveSettings",
    columns: table => new
    {
        ID = table.Column<int>(type: "int", nullable: false),
        Year = table.Column<int>(type: "int", nullable: false),
        TypeOfLeave = table.Column<int>(type: "int", nullable: false),
        NumberOfLeaves = table.Column<int>(type: "int", nullable: false)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_LeaveSettings", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "LeaveTypes",
    columns: table => new
    {
        ID = table.Column<int>(type: "int", nullable: false),
        Name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_LeaveTypes", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "LiveUpdates",
    columns: table => new
    {
        Id = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        Title = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
        Description = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
        DateOfEntry = table.Column<DateOnly>(type: "date", nullable: false),
        Status = table.Column<bool>(type: "bit", nullable: false)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK__LiveUpda__3214EC0756D54FC0", x => x.Id);
    });

migrationBuilder.CreateTable(
    name: "Organization",
    columns: table => new
    {
        ID = table.Column<int>(type: "int", nullable: false),
        OrgName = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        IsActive = table.Column<bool>(type: "bit", nullable: true),
        TimeZone = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
        Shifts = table.Column<bool>(type: "bit", nullable: true),
        IncludeLogofToIdle = table.Column<bool>(type: "bit", nullable: true),
        Currency = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Organization", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "ProcessedFile",
    columns: table => new
    {
        ID = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        Filename = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: true),
        Status = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_ProcessedFile", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "Projects",
    columns: table => new
    {
        ProjectId = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        Description = table.Column<string>(type: "varchar(500)", unicode: false, maxLength: 500, nullable: true),
        StartDate = table.Column<DateOnly>(type: "date", nullable: true),
        EndDate = table.Column<DateOnly>(type: "date", nullable: true),
        Status = table.Column<int>(type: "int", nullable: true),
        EstimatedBudget = table.Column<decimal>(type: "numeric(18,0)", nullable: true),
        EstimatedHours = table.Column<int>(type: "int", nullable: true),
        TimeSheetInterval = table.Column<int>(type: "int", nullable: true),
        OrganizationID = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Projects", x => x.ProjectId);
    });

migrationBuilder.CreateTable(
    name: "ProjectStatus",
    columns: table => new
    {
        StatusID = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        StatusType = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        OrganizationID = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
    });

migrationBuilder.CreateTable(
    name: "ProjectTimesheetInterval",
    columns: table => new
    {
        TimesheetIntervalID = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        TimesheetType = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        OrganizationID = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
    });

migrationBuilder.CreateTable(
    name: "ReaderData",
    columns: table => new
    {
        ID = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        ReadingData = table.Column<DateTime>(type: "datetime", nullable: true),
        EmployeeId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_ReaderData", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "ScreenShots",
    columns: table => new
    {
        ID = table.Column<long>(type: "bigint", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        ImageData = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
        EmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        DateOfScreenshot = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getutcdate())"),
        IsIdleTime = table.Column<int>(type: "int", nullable: true),
        TaskId = table.Column<int>(type: "int", nullable: true),
        KeyStrokes = table.Column<int>(type: "int", nullable: true),
        MouseStrokes = table.Column<int>(type: "int", nullable: true),
        ManualTime = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
        OrganizationID = table.Column<int>(type: "int", nullable: true),
        ImageName = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        WindowTitles = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_ScreenShots", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "Shift",
    columns: table => new
    {
        ShiftId = table.Column<int>(type: "int", nullable: false),
        Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        StartTime = table.Column<TimeOnly>(type: "time", nullable: true),
        EndTime = table.Column<TimeOnly>(type: "time", nullable: true),
        OrganizationID = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Shift", x => x.ShiftId);
    });

migrationBuilder.CreateTable(
    name: "TaskMembers",
    columns: table => new
    {
        ID = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        TaskID = table.Column<int>(type: "int", nullable: true),
        EmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        IsManager = table.Column<bool>(type: "bit", nullable: true),
        Status = table.Column<int>(type: "int", nullable: false)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_TaskMembers", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "TimeLog",
    columns: table => new
    {
        ID = table.Column<long>(type: "bigint", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        LoginTime = table.Column<DateTime>(type: "datetime", nullable: true),
        LogoutTime = table.Column<DateTime>(type: "datetime", nullable: true),
        EmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_TimeLog", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "Timesheets",
    columns: table => new
    {
        ID = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        TimesheetStartDate = table.Column<DateOnly>(type: "date", nullable: true),
        TimesheetEndDate = table.Column<DateOnly>(type: "date", nullable: true),
        Status = table.Column<int>(type: "int", nullable: true),
        TimesheetInterval = table.Column<int>(type: "int", nullable: true),
        HoursConsumed = table.Column<int>(type: "int", nullable: true),
        BudgetConsumed = table.Column<decimal>(type: "numeric(18,0)", nullable: true),
        ProjectID = table.Column<int>(type: "int", nullable: true),
        EmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Timesheets", x => x.ID);
    });

migrationBuilder.CreateTable(
    name: "WorkLog",
    columns: table => new
    {
        Id = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        EmployeeCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
        Date = table.Column<DateOnly>(type: "date", nullable: false),
        HoursWorked = table.Column<double>(type: "float", nullable: false),
        HoursIdle = table.Column<double>(type: "float", nullable: false),
        ActualWork = table.Column<double>(type: "float", nullable: false),
        ImportHistoryId = table.Column<int>(type: "int", nullable: false),
        ManualTime = table.Column<double>(type: "float", nullable: false)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_WorkLog", x => x.Id);
    });

migrationBuilder.CreateTable(
    name: "Department",
    columns: table => new
    {
        DepartmentId = table.Column<int>(type: "int", nullable: false),
        Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        OrganizationID = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Table_1", x => x.DepartmentId);
        table.ForeignKey(
            name: "FK_Department_Organization",
            column: x => x.OrganizationID,
            principalTable: "Organization",
            principalColumn: "ID");
    });

migrationBuilder.CreateTable(
    name: "Designation",
    columns: table => new
    {
        DesignationId = table.Column<int>(type: "int", nullable: false),
        Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        OrganizationID = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Designation", x => x.DesignationId);
        table.ForeignKey(
            name: "FK_Designation_Organization",
            column: x => x.OrganizationID,
            principalTable: "Organization",
            principalColumn: "ID");
    });

migrationBuilder.CreateTable(
    name: "ProjectTeam",
    columns: table => new
    {
        MemeberID = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        EmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
        ProjectID = table.Column<int>(type: "int", nullable: false),
        IsManager = table.Column<bool>(type: "bit", nullable: true),
        IsActive = table.Column<bool>(type: "bit", nullable: true),
        HourlyRate = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK__ProjectT__560EC19CBC304D1C", x => x.MemeberID);
        table.ForeignKey(
            name: "FK__ProjectTe__Proje__1A9EF37A",
            column: x => x.ProjectID,
            principalTable: "Projects",
            principalColumn: "ProjectId");
    });

migrationBuilder.CreateTable(
    name: "Tasks",
    columns: table => new
    {
        TaskId = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        Name = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: true),
        Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
        Status = table.Column<bool>(type: "bit", nullable: true),
        ProjectId = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Tasks", x => x.TaskId);
        table.ForeignKey(
            name: "FK_Tasks_Projects",
            column: x => x.ProjectId,
            principalTable: "Projects",
            principalColumn: "ProjectId");
    });

migrationBuilder.CreateTable(
    name: "Employee",
    columns: table => new
    {
        EmployeeId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
        Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        EmpCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        DesignationId = table.Column<int>(type: "int", nullable: true),
        DepartmentId = table.Column<int>(type: "int", nullable: true),
        JoiningDate = table.Column<DateOnly>(type: "date", nullable: true),
        RelievingDate = table.Column<DateOnly>(type: "date", nullable: true),
        BankAccountNumber = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
        BankId = table.Column<int>(type: "int", nullable: true),
        DateOfBirth = table.Column<DateOnly>(type: "date", nullable: true),
        ContactNumber1 = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        ContactNumber2 = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        FatherName = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        CorrespondenceAddress = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
        PermanentAddress = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
        PersonalEmailId = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        PanNumber = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
        OfficialEmailId = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        SkypeId = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
        Status = table.Column<int>(type: "int", nullable: true),
        Password = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
        RoleId = table.Column<int>(type: "int", nullable: false, defaultValue: 1),
        CompanyId = table.Column<int>(type: "int", nullable: false, defaultValue: 1),
        IFSCCode = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        AdharCardNumber = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        OfficialEmailPassword = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        BloodGroup = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        OrganizationID = table.Column<int>(type: "int", nullable: true),
        Id = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        ShiftId = table.Column<int>(type: "int", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Employee", x => x.EmployeeId);
        table.ForeignKey(
            name: "FK_Employee_Bank",
            column: x => x.BankId,
            principalTable: "Bank",
            principalColumn: "BankID");
        table.ForeignKey(
            name: "FK_Employee_Company",
            column: x => x.CompanyId,
            principalTable: "Company",
            principalColumn: "CompanyId");
        table.ForeignKey(
            name: "FK_Employee_Department",
            column: x => x.DepartmentId,
            principalTable: "Department",
            principalColumn: "DepartmentId");
        table.ForeignKey(
            name: "FK_Employee_Designation",
            column: x => x.DesignationId,
            principalTable: "Designation",
            principalColumn: "DesignationId");
        table.ForeignKey(
            name: "FK_Employee_EmployeeRoles",
            column: x => x.RoleId,
            principalTable: "EmployeeRoles",
            principalColumn: "RoleId");
        table.ForeignKey(
            name: "FK_Employee_Organization",
            column: x => x.OrganizationID,
            principalTable: "Organization",
            principalColumn: "ID");
        table.ForeignKey(
            name: "FK_Employee_Shift",
            column: x => x.ShiftId,
            principalTable: "Shift",
            principalColumn: "ShiftId");
    });

migrationBuilder.CreateTable(
    name: "UserLeave",
    columns: table => new
    {
        LeaveId = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        EmployeeId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
        ReasonForLeave = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
        LeaveType = table.Column<int>(type: "int", nullable: true),
        LeaveApproval = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: true),
        StartLeave = table.Column<DateOnly>(type: "date", nullable: true),
        EndLeave = table.Column<DateOnly>(type: "date", nullable: true),
        IsApproved = table.Column<bool>(type: "bit", nullable: true)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_UserLeave", x => x.LeaveId);
        table.ForeignKey(
            name: "FK_UserLeave_Employee",
            column: x => x.EmployeeId,
            principalTable: "Employee",
            principalColumn: "EmployeeId");
    });

migrationBuilder.CreateIndex(
    name: "IX_Department_OrganizationID",
    table: "Department",
    column: "OrganizationID");

migrationBuilder.CreateIndex(
    name: "IX_Designation_OrganizationID",
    table: "Designation",
    column: "OrganizationID");

migrationBuilder.CreateIndex(
    name: "IX_Employee_BankId",
    table: "Employee",
    column: "BankId");

migrationBuilder.CreateIndex(
    name: "IX_Employee_CompanyId",
    table: "Employee",
    column: "CompanyId");

migrationBuilder.CreateIndex(
    name: "IX_Employee_DepartmentId",
    table: "Employee",
    column: "DepartmentId");

migrationBuilder.CreateIndex(
    name: "IX_Employee_DesignationId",
    table: "Employee",
    column: "DesignationId");

migrationBuilder.CreateIndex(
    name: "IX_Employee_OrganizationID",
    table: "Employee",
    column: "OrganizationID");

migrationBuilder.CreateIndex(
    name: "IX_Employee_RoleId",
    table: "Employee",
    column: "RoleId");

migrationBuilder.CreateIndex(
    name: "IX_Employee_ShiftId",
    table: "Employee",
    column: "ShiftId");

migrationBuilder.CreateIndex(
    name: "IX_ProjectTeam_ProjectID",
    table: "ProjectTeam",
    column: "ProjectID");

migrationBuilder.CreateIndex(
    name: "IX_Tasks_ProjectId",
    table: "Tasks",
    column: "ProjectId");

migrationBuilder.CreateIndex(
    name: "IX_UserLeave_EmployeeId",
    table: "UserLeave",
    column: "EmployeeId");
            }

            // <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "_readerdata");

            migrationBuilder.DropTable(
                name: "DefaultColumns");

            migrationBuilder.DropTable(
                name: "EmployeeAppraisals");

            migrationBuilder.DropTable(
                name: "EmployeeLeaves");

            migrationBuilder.DropTable(
                name: "ImportHistory");

            migrationBuilder.DropTable(
                name: "LeaveApplication");

            migrationBuilder.DropTable(
                name: "LeaveNotifications");

            migrationBuilder.DropTable(
                name: "LeaveSettings");

            migrationBuilder.DropTable(
                name: "LeaveTypes");

            migrationBuilder.DropTable(
                name: "LiveUpdates");

            migrationBuilder.DropTable(
                name: "ProcessedFile");

            migrationBuilder.DropTable(
                name: "ProjectStatus");

            migrationBuilder.DropTable(
                name: "ProjectTeam");

            migrationBuilder.DropTable(
                name: "ProjectTimesheetInterval");

            migrationBuilder.DropTable(
                name: "ReaderData");

            migrationBuilder.DropTable(
                name: "ScreenShots");

            migrationBuilder.DropTable(
                name: "TaskMembers");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "TimeLog");

            migrationBuilder.DropTable(
                name: "Timesheets");

            migrationBuilder.DropTable(
                name: "UserLeave");

            migrationBuilder.DropTable(
                name: "WorkLog");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "Bank");

            migrationBuilder.DropTable(
                name: "Company");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropTable(
                name: "Designation");

            migrationBuilder.DropTable(
                name: "EmployeeRoles");

            migrationBuilder.DropTable(
                name: "Shift");

            migrationBuilder.DropTable(
                name: "Organization");

            migrationBuilder.DropColumn(
                name: "DealName",
                table: "Invoices");
        }
    
     }
}
