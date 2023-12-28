import { useTvShowApi, useUserApi } from "@infrastructure/apis/api-management";
import { usePaginationController } from "@presentation/components/ui/Tables/Pagination.controller";
import { useTableController } from "@presentation/components/ui/Tables/Table.controller";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { ShowOptions } from '../Library.types';
import { useAppSelector } from "@application/store";

export const useTvShowController = () => {
    const {
        getTvShows: { key: getTvShowsKey, query: getTvShows },
        deleteTvShow: { key: deleteTvShowKey, mutation: deleteTvShow }
    } = useTvShowApi();

    const {
        toggleFavouriteTvShow: { key: toggleFavouriteTvShowKey, mutation: toggleFavouriteTvShow }
    } = useUserApi()
    const { loggedIn } = useAppSelector(x => x.profileReducer);

    const queryClient = useQueryClient();
    const { page, pageSize, setPagination } = usePaginationController();
    const {
        data: dataTvShows,
        isError: isErrorTvShows,
        isLoading: isLoadingTvShows
    } = useQuery([getTvShowsKey, page, pageSize], () => getTvShows({ page, pageSize }));

    const { mutateAsync: deleteMutation } = useMutation([deleteTvShowKey], deleteTvShow);
    const { mutateAsync: toggleTvShowMutation } = useMutation([toggleFavouriteTvShowKey], toggleFavouriteTvShow);
    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => queryClient.invalidateQueries([getTvShowsKey])),
        [queryClient, deleteMutation, getTvShowsKey, toggleFavouriteTvShow]);

    const tryReload = useCallback(
        () => queryClient.invalidateQueries([getTvShowsKey]),
        [queryClient, getTvShowsKey]);

    const toggleFavourite = useCallback(
        (tvShowId: string) => toggleTvShowMutation(tvShowId).then(() => queryClient.invalidateQueries([])),
        [queryClient, toggleFavouriteTvShow]);

    const tableController = useTableController(setPagination, dataTvShows?.response?.pageSize);

    return {
        ...tableController,
        tryReload,
        tvShows: dataTvShows?.response,
        isError: isErrorTvShows,
        isLoading: isLoadingTvShows,
        remove,
        toggleFavourite
    };
}