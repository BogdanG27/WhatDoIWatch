import { useMovieApi, useUserApi } from "@infrastructure/apis/api-management";
import { usePaginationController } from "@presentation/components/ui/Tables/Pagination.controller";
import { useTableController } from "@presentation/components/ui/Tables/Table.controller";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAppSelector } from "@application/store";

export const useMovieRecommandationsController = (id?: string) => {
    const {
        getMoviesRecommandations: { key: getMoviesRecommandationsKey, query: getMoviesRecommandations }
    } = useMovieApi();

    const {
        data: dataMoviesRecommandations,
        isError: isErrorMoviesRecommandations,
        isLoading: isLoadingMoviesRecommandations
    } = useQuery([getMoviesRecommandationsKey, id], () => getMoviesRecommandations(id!));


    return {
        movies: dataMoviesRecommandations?.response,
        isError: isErrorMoviesRecommandations,
        isLoading: isLoadingMoviesRecommandations,
    };
}