using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class NewAdded_Employee12BBAndFinancialYear_Modal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          

     
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employee12BBs_FinancialYears_FinancialYearId",
                table: "Employee12BBs");

            migrationBuilder.DropIndex(
                name: "IX_Employee12BBs_FinancialYearId",
                table: "Employee12BBs");

            migrationBuilder.DropColumn(
                name: "FinancialYearName",
                table: "FinancialYears");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "FinancialYears",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AddColumn<string>(
                name: "Financialyear",
                table: "FinancialYears",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Employee12BBFinancialYear",
                columns: table => new
                {
                    Employee12BBsId = table.Column<int>(type: "int", nullable: false),
                    FinancialYearsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee12BBFinancialYear", x => new { x.Employee12BBsId, x.FinancialYearsId });
                    table.ForeignKey(
                        name: "FK_Employee12BBFinancialYear_Employee12BBs_Employee12BBsId",
                        column: x => x.Employee12BBsId,
                        principalTable: "Employee12BBs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Employee12BBFinancialYear_FinancialYears_FinancialYearsId",
                        column: x => x.FinancialYearsId,
                        principalTable: "FinancialYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employee12BBFinancialYear_FinancialYearsId",
                table: "Employee12BBFinancialYear",
                column: "FinancialYearsId");
        }
    }
}
