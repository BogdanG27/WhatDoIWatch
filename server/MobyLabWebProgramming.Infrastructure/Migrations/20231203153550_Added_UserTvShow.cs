using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class Added_UserTvShow : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TvShow_User_UserId",
                table: "TvShow");

            migrationBuilder.DropIndex(
                name: "IX_TvShow_UserId",
                table: "TvShow");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TvShow");

            migrationBuilder.CreateTable(
                name: "UserTvShow",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    TvShowId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTvShow", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserTvShow_TvShow_TvShowId",
                        column: x => x.TvShowId,
                        principalTable: "TvShow",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTvShow_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserTvShow_TvShowId",
                table: "UserTvShow",
                column: "TvShowId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTvShow_UserId",
                table: "UserTvShow",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserTvShow");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "TvShow",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TvShow_UserId",
                table: "TvShow",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TvShow_User_UserId",
                table: "TvShow",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}
