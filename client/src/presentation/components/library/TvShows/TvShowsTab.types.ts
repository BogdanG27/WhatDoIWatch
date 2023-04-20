import { MovieDTO, TvShowDTO, UserDTO } from "@infrastructure/apis/client";

export interface TvShowsTabProps {
    tvShows: TvShowDTO[] | null | undefined,
    user: UserDTO | undefined
}
