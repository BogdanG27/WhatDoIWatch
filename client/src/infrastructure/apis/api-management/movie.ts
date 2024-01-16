import { useAppSelector } from "@application/store";
import { ApiMovieGetPageGetRequest, MovieAddDTO, MovieApi, MovieUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

const getMoviesQueryKey = "getMoviesQuery";
const getMovieQueryKey = "getMovieQuery";
const getMoviesRecommandationsQueryKey = "getMoviesRecommandationsQuery";
const getFavouriteMoviesQueryKey = "getFavouriteMoviesQuery";
const addMovieMutationKey = "addMovieMutation";
const deleteMovieMutationKey = "deleteMovieMutation";
const updateMovieMutationKey = "updateMovieMutation";

export const useMovieApi = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const config = getAuthenticationConfiguration(token);

    const getMovies = (page: ApiMovieGetPageGetRequest) => new MovieApi(config).apiMovieGetPageGet(page);
    const getMoviesRecommandations = (id: string) => new MovieApi(config).apiMovieGetMovieRecommandationsIdGet({ id });
    const getMovie = (id: string) => new MovieApi(config).apiMovieGetByIdIdGet({ id });
    const addMovie = (movie: MovieAddDTO) => new MovieApi(config).apiMovieAddPost({ movieAddDTO: movie });
    const deleteMovie = (id: string) => new MovieApi(config).apiMovieDeleteIdDelete({ id });
    const updateMovie = (movie: MovieUpdateDTO) => new MovieApi(config).apiMovieUpdatePut({ movieUpdateDTO: movie });
    const getFavouriteMovies = () => new MovieApi(config).apiMovieGetFavouriteMoviesGet({});

    return {
        getMovies: {
            key: getMoviesQueryKey,
            query: getMovies
        },
        getMoviesRecommandations: {
            key: getMoviesRecommandationsQueryKey,
            query: getMoviesRecommandations
        },
        getFavouriteMovies: {
            key: getFavouriteMoviesQueryKey,
            query: getFavouriteMovies
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