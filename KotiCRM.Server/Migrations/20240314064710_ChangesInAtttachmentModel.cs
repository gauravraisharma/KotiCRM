using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KotiCRM.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangesInAtttachmentModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SizeMb",
                table: "Attachments",
                newName: "FileSize");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FileSize",
                table: "Attachments",
                newName: "SizeMb");
        }
    }
}
