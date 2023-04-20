import { useAppSelector } from "@application/store";
import { ApiMovieGetPageGetRequest, MovieAddDTO, MovieApi, MovieUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

const getMoviesQueryKey = "getMoviesQuery";
const getMovieQueryKey = "getMovieQuery";
const getFavouriteMoviesQueryKey = "getFavouriteMoviesQuery";
const addMovieMutationKey = "addMovieMutation";
const deleteMovieMutationKey = "deleteMovieMutation";
const updateMovieMutationKey = "updateMovieMutation";

export const useMovieApi = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const config = getAuthenticationConfiguration(token);

    const getMovies = (page: ApiMovieGetPageGetRequest) => new MovieApi(config).apiMovieGetPageGet(page);
    const getMoviesFavourites = (page: ApiMovieGetPageGetRequest) => new MovieApi(config).apiMovieGetPageFavouritesGet(page);
    const getMovie = (id: string) => new MovieApi(config).apiMovieGetByIdIdGet({ id });
    const addMovie = (movie: MovieAddDTO) => new MovieApi(config).apiMovieAddPost({ movieAddDTO: movie });
    const deleteMovie = (id: string) => new MovieApi(config).apiMovieDeleteIdDelete({ id });
    const updateMovie = (movie: MovieUpdateDTO) => new MovieApi(config).apiMovieUpdatePut({ movieUpdateDTO: movie });

    return {
        getMovies: {
            key: getMoviesQueryKey,
            query: getMovies
        },
        getFavouriteMovies: {
            key: getFavouriteMoviesQueryKey,
            query: getMoviesFavourites
        },
        getMovie: {
            key: getMovieQueryKey,
            query: getMovie
        },
        addMovie: {
            key: addMovieMutationKey,
            mutation: addMovie
        },
        deleteMovie: {
            key: deleteMovieMutationKey,
            mutation: deleteMovie
        },
        updateMovie: {
            key: updateMovieMutationKey,
            mutation: updateMovie
        }
    }
}