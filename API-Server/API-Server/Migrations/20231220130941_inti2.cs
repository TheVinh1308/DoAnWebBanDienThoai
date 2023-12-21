using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Server.Migrations
{
    public partial class inti2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_ModPhones_ModPhoneId",
                table: "Favorites");

            migrationBuilder.RenameColumn(
                name: "ModPhoneId",
                table: "Favorites",
                newName: "PhoneId");

            migrationBuilder.RenameIndex(
                name: "IX_Favorites_ModPhoneId",
                table: "Favorites",
                newName: "IX_Favorites_PhoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_Phones_PhoneId",
                table: "Favorites",
                column: "PhoneId",
                principalTable: "Phones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_Phones_PhoneId",
                table: "Favorites");

            migrationBuilder.RenameColumn(
                name: "PhoneId",
                table: "Favorites",
                newName: "ModPhoneId");

            migrationBuilder.RenameIndex(
                name: "IX_Favorites_PhoneId",
                table: "Favorites",
                newName: "IX_Favorites_ModPhoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_ModPhones_ModPhoneId",
                table: "Favorites",
                column: "ModPhoneId",
                principalTable: "ModPhones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
