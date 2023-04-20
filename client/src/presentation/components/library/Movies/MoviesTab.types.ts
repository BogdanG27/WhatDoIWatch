import { MovieDTO, UserDTO } from "@infrastructure/apis/client";

export interface MoviesTabProps {
    movies: MovieDTO[] | null | undefined,
    user?: UserDTO | undefined
}
