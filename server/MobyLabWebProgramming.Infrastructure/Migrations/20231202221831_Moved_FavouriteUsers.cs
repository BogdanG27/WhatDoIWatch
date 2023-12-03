using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class Moved_FavouriteUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserMovies");

            migrationBuilder.DropTable(
                name: "UserTvShows");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "TvShow",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserMovie",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    MovieId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMovie", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMovie_Movie_MovieId",
                        column: x => x.MovieId,
                        principalTable: "Movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserMovie_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TvShow_UserId",
                table: "TvShow",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMovie_MovieId",
                table: "UserMovie",
                column: "MovieId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMovie_UserId",
                table: "UserMovie",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TvShow_User_UserId",
                table: "TvShow",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TvShow_User_UserId",
                table: "TvShow");

            migrationBuilder.DropTable(
                name: "UserMovie");

            migrationBuilder.DropIndex(
                name: "IX_TvShow_UserId",
                table: "TvShow");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TvShow");

            migrationBuilder.CreateTable(
                name: "UserMovies",
                columns: table => new
                {
                    FavoriteMoviesId = table.Column<Guid>(type: "uuid", nullable: false),
                    FavouriteUsersId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMovies", x => new { x.FavoriteMoviesId, x.FavouriteUsersId });
                    table.ForeignKey(
                        name: "FK_UserMovies_Movie_FavoriteMoviesId",
                        column: x => x.FavoriteMoviesId,
                        principalTable: "Movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserMovies_User_FavouriteUsersId",
                        column: x => x.FavouriteUsersId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTvShows",
                columns: table => new
                {
                    FavoriteTvShowsId = table.Column<Guid>(type: "uuid", nullable: false),
                    FavouriteUsersId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTvShows", x => new { x.FavoriteTvShowsId, x.FavouriteUsersId });
                    table.ForeignKey(
                        name: "FK_UserTvShows_TvShow_FavoriteTvShowsId",
                        column: x => x.FavoriteTvShowsId,
                        principalTable: "TvShow",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTvShows_User_FavouriteUsersId",
                        column: x => x.FavouriteUsersId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserMovies_FavouriteUsersId",
                table: "UserMovies",
                column: "FavouriteUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTvShows_FavouriteUsersId",
                table: "UserTvShows",
                column: "FavouriteUsersId");
        }
    }
}
