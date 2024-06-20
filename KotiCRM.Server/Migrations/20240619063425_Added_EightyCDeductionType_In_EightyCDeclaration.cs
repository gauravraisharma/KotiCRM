using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class Added_EightyCDeductionType_In_EightyCDeclaration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EightyCDeclarationId",
                table: "EightyCDeductionTypes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EightyCDeductionTypes_EightyCDeclarationId",
                table: "EightyCDeductionTypes",
                column: "EightyCDeclarationId");

            migrationBuilder.AddForeignKey(
                name: "FK_EightyCDeductionTypes_EightyCDeclarations_EightyCDeclarationId",
                table: "EightyCDeductionTypes",
                column: "EightyCDeclarationId",
                principalTable: "EightyCDeclarations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EightyCDeductionTypes_EightyCDeclarations_EightyCDeclarationId",
                table: "EightyCDeductionTypes");

            migrationBuilder.DropIndex(
                name: "IX_EightyCDeductionTypes_EightyCDeclarationId",
                table: "EightyCDeductionTypes");

            migrationBuilder.DropColumn(
                name: "EightyCDeclarationId",
                table: "EightyCDeductionTypes");
        }
    }
}
