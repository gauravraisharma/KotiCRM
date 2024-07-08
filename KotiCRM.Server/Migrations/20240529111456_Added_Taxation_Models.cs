using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class Added_Taxation_Models : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EightyCDeductionTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EightyCDeductionTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EightyDDeclarations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InsuranceAmount = table.Column<int>(type: "int", nullable: false),
                    InsuranceProofLink = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MedicalExpenseAmount = table.Column<int>(type: "int", nullable: false),
                    MedicalExpenseProof = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EightyDDeclarations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EightyGDeclarations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameOfDonee = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PanNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    ProofDocumentLink = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EightyGDeclarations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HomeLoanDeclarations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LenderName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LenderAddress = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    LenderPanNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    ProofDocumentLink = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeLoanDeclarations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HouseRentDeclarations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    OwnerPanCard = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ProofDocumentLink = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HouseRentDeclarations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OtherInvestmentDeclarations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ProofDocumentLink = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtherInvestmentDeclarations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TravelExpenditureDeclarations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    ProofDocumentLink = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TravelExpenditureDeclarations", x => x.Id);
                });

            migrationBuilder.CreateTable(
        name: "Employee12BBs",
        columns: table => new
        {
            Id = table.Column<int>(type: "int", nullable: false)
                .Annotation("SqlServer:Identity", "1, 1"),
            EmployeeId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            FinancialYear = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
            HouseRentRecordId = table.Column<int>(type: "int", nullable: true),
            TravelExpenditureRecordId = table.Column<int>(type: "int", nullable: true),
            HomeLoanRecordId = table.Column<int>(type: "int", nullable: true),
            EightyDRecordId = table.Column<int>(type: "int", nullable: true),
            EightyGRecordId = table.Column<int>(type: "int", nullable: true),
            OtherInvestmentRecordId = table.Column<int>(type: "int", nullable: true),
            CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
            ModifiedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
            IsDelete = table.Column<bool>(type: "bit", nullable: false),
            IsActive = table.Column<bool>(type: "bit", nullable: false),
            IsFormVerified = table.Column<bool>(type: "bit", nullable: false),
            IsDeclarationComplete = table.Column<bool>(type: "bit", nullable: false)
        },
        constraints: table =>
        {
            table.PrimaryKey("PK_Employee12BBs", x => x.Id);
            table.ForeignKey(
                name: "FK_Employee12BBs_EightyDDeclarations_EightyDRecordId",
                column: x => x.EightyDRecordId,
                principalTable: "EightyDDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            table.ForeignKey(
                name: "FK_Employee12BBs_EightyGDeclarations_EightyGRecordId",
                column: x => x.EightyGRecordId,
                principalTable: "EightyGDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            table.ForeignKey(
                name: "FK_Employee12BBs_Employee_EmployeeId",
                column: x => x.EmployeeId,
                principalTable: "Employee",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Restrict);
            table.ForeignKey(
                name: "FK_Employee12BBs_HomeLoanDeclarations_HomeLoanRecordId",
                column: x => x.HomeLoanRecordId,
                principalTable: "HomeLoanDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            table.ForeignKey(
                name: "FK_Employee12BBs_HouseRentDeclarations_HouseRentRecordId",
                column: x => x.HouseRentRecordId,
                principalTable: "HouseRentDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            table.ForeignKey(
                name: "FK_Employee12BBs_OtherInvestmentDeclarations_OtherInvestmentRecordId",
                column: x => x.OtherInvestmentRecordId,
                principalTable: "OtherInvestmentDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            table.ForeignKey(
                name: "FK_Employee12BBs_TravelExpenditureDeclarations_TravelExpenditureRecordId",
                column: x => x.TravelExpenditureRecordId,
                principalTable: "TravelExpenditureDeclarations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        });

            migrationBuilder.CreateTable(
                name: "EightyCDeclarations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeductionTypeId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    ProofDocumentLink = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    Employee12BBId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EightyCDeclarations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EightyCDeclarations_Employee12BBs_Employee12BBId",
                        column: x => x.Employee12BBId,
                        principalTable: "Employee12BBs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EightyCDeclarations_Employee12BBId",
                table: "EightyCDeclarations",
                column: "Employee12BBId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee12BBs_EightyDRecordId",
                table: "Employee12BBs",
                column: "EightyDRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee12BBs_EightyGRecordId",
                table: "Employee12BBs",
                column: "EightyGRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee12BBs_EmployeeId",
                table: "Employee12BBs",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee12BBs_HomeLoanRecordId",
                table: "Employee12BBs",
                column: "HomeLoanRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee12BBs_HouseRentRecordId",
                table: "Employee12BBs",
                column: "HouseRentRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee12BBs_OtherInvestmentRecordId",
                table: "Employee12BBs",
                column: "OtherInvestmentRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee12BBs_TravelExpenditureRecordId",
                table: "Employee12BBs",
                column: "TravelExpenditureRecordId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EightyCDeclarations");

            migrationBuilder.DropTable(
                name: "EightyCDeductionTypes");

            migrationBuilder.DropTable(
                name: "Employee12BBs");

            migrationBuilder.DropTable(
                name: "EightyDDeclarations");

            migrationBuilder.DropTable(
                name: "EightyGDeclarations");

            migrationBuilder.DropTable(
                name: "HomeLoanDeclarations");

            migrationBuilder.DropTable(
                name: "HouseRentDeclarations");

            migrationBuilder.DropTable(
                name: "OtherInvestmentDeclarations");

            migrationBuilder.DropTable(
                name: "TravelExpenditureDeclarations");
        }
    }
}
