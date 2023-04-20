/**
 * Here you can add more routes as constant to be used for routing within the application.
 */
export enum AppRoute {
  Index = "/",
  Login = "/login",
  Register = "/register",
  Users = "/tables/users",
  UserFiles = "/tables/user-files",
  Movies = "/tables/movies",
  TvShows = "/tables/tv-shows",
  Actors = "/tables/actors",
  Staff = "/tables/staff",
  Library = "/library",
  MovieItem = "/library/movies/:guid",
  Movie = "/library/movies",
  TvShow = "/library/tvShows",
  TvShowItem = "/library/tvShows/:guid",
  Favourites = "/favourites",
}
