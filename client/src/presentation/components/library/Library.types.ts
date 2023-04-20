import { MovieDTO, TvShowDTO } from "@infrastructure/apis/client"

export type ShowOptions = "all" | "favourites"
export type Media = MovieDTO | TvShowDTO;