using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class Add_FinancialYear_Modal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FinancialYears",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FinancialYearName = table.Column<string>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancialYears", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
               name: "FinancialYears");

        }
    }
}
