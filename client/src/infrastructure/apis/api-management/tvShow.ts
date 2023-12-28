import { useAppSelector } from "@application/store";
import { ApiTvShowGetPageGetRequest, TvShowAddDTO, TvShowApi, TvShowUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

const getTvShowsQueryKey = "getTvShowsQuery";
const getTvShowQueryKey = "getTvShowQuery";
const addTvShowMutationKey = "addTvShowMutation";
const deleteTvShowMutationKey = "deleteTvShowMutation";
const updateTvShowMutationKey = "updateTvShowMutation";

export const useTvShowApi = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const config = getAuthenticationConfiguration(token);

    const getTvShows = (page: ApiTvShowGetPageGetRequest) => new TvShowApi(config).apiTvShowGetPageGet(page);
    const getTvShow = (id: string) => new TvShowApi(config).apiTvShowGetByIdIdGet({ id });
    const addTvShow = (tvShow: TvShowAddDTO) => new TvShowApi(config).apiTvShowAddPost({ tvShowAddDTO: tvShow });
    const deleteTvShow = (id: string) => new TvShowApi(config).apiTvShowDeleteIdDelete({ id });
    const updateTvShow = (tvShow: TvShowUpdateDTO) => new TvShowApi(config).apiTvShowUpdatePut({ tvShowUpdateDTO: tvShow });

    return {
        getTvShows: {
            key: getTvShowsQueryKey,
            query: getTvShows
        },
        getTvShow: {
            key: getTvShowQueryKey,
            query: getTvShow
        },
        addTvShow: {
            key: addTvShowMutationKey,
            mutation: addTvShow
        },
        deleteTvShow: {
            key: deleteTvShowMutationKey,
            mutation: deleteTvShow
        },
        updateTvShow: {
            key: updateTvShowMutationKey,
            mutation: updateTvShow
        }
    }
}