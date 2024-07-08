using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class Modified_Employee12BB_Model : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_EightyCDeclarations_Employee12BBId",
                table: "EightyCDeclarations");

            migrationBuilder.CreateIndex(
                name: "IX_EightyCDeclarations_Employee12BBId",
                table: "EightyCDeclarations",
                column: "Employee12BBId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_EightyCDeclarations_Employee12BBId",
                table: "EightyCDeclarations");

            migrationBuilder.CreateIndex(
                name: "IX_EightyCDeclarations_Employee12BBId",
                table: "EightyCDeclarations",
                column: "Employee12BBId");
        }
    }
}
