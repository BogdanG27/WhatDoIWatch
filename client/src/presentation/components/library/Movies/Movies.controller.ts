import { useMovieApi, useUserApi } from "@infrastructure/apis/api-management";
import { usePaginationController } from "@presentation/components/ui/Tables/Pagination.controller";
import { useTableController } from "@presentation/components/ui/Tables/Table.controller";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { ShowOptions } from '../Library.types';
import { useAppSelector } from "@application/store";

export const useMovieController = () => {
    const {
        getMovies: { key: getMoviesKey, query: getMovies },
        getFavouriteMovies: { key: getFavouriteMoviesKey, query: getFavouriteMovies },
        deleteMovie: { key: deleteMovieKey, mutation: deleteMovie }
    } = useMovieApi();

    const {
        toggleFavouriteMovie: { key: toggleFavouriteMovieKey, mutation: toggleFavouriteMovie }
    } = useUserApi()
    const { loggedIn } = useAppSelector(x => x.profileReducer);

    const queryClient = useQueryClient();
    const { page, pageSize, setPagination } = usePaginationController();
    const {
        data: dataMovies,
        isError: isErrorMovies,
        isLoading: isLoadingMovies
    } = useQuery([getMoviesKey, page, pageSize], () => getMovies({ page, pageSize }));

    const { mutateAsync: deleteMutation } = useMutation([deleteMovieKey], deleteMovie);
    const { mutateAsync: toggleMovieMutation } = useMutation([toggleFavouriteMovieKey], toggleFavouriteMovie);
    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => queryClient.invalidateQueries([getMoviesKey, getFavouriteMoviesKey])),
        [queryClient, deleteMutation, getMoviesKey, getFavouriteMoviesKey, toggleFavouriteMovie]);

    const tryReload = useCallback(
        () => queryClient.invalidateQueries([getMoviesKey]),
        [queryClient, getMoviesKey]);

    const toggleFavourite = useCallback(
        (movieId: string) => toggleMovieMutation(movieId).then(() => queryClient.invalidateQueries([getFavouriteMoviesKey])),
        [queryClient, getFavouriteMoviesKey, toggleFavouriteMovie]);

    const tableController = useTableController(setPagination, dataMovies?.response?.pageSize);

    return {
        ...tableController,
        tryReload,
        movies: dataMovies?.response,
        isError: isErrorMovies,
        isLoading: isLoadingMovies,
        remove,
        toggleFavourite
    };
}