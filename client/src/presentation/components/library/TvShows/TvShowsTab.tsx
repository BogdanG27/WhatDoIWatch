import { useAppSelector } from '@application/store'
import { useUserApi } from '@infrastructure/apis/api-management'
import { Grid, TablePagination } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { isUndefined } from 'lodash'
import { useIntl } from 'react-intl'
import { ShowOptions } from '../Library.types'
import MediaCard from '../MediaCard'
import { TvShowsTabProps } from './TvShowsTab.types'
import { useTvShowController } from './TvShow.controller'

export const TvShowsAll = ({ tvShows, user }: TvShowsTabProps) => {

  return <>
    {tvShows?.map(tvShow => {
      const isFavourite = user?.favouriteTvShows?.some(favTvShow => favTvShow.tvShowId === tvShow.id);
      return <Grid key={tvShow.id} item xs={12} sm={6} md={4}>
        <MediaCard
          media={tvShow}
          isFavourite={isFavourite}
          type='tvShow'
        />
      </Grid>
    })}
  </>
}

export const TvShowsFavourite = ({ tvShows, user }: TvShowsTabProps) => {
  return <>
    {tvShows?.filter(tvShow => user?.favouriteTvShows?.some(favTvShow => favTvShow.tvShowId === tvShow.id)).map(tvShow => <Grid key={tvShow.id} item xs={12} sm={6} md={4}>
      <MediaCard
        media={tvShow}
        isFavourite={true}
        type="tvShow"
      />
    </Grid>)}
  </>
}

export const TvShowsTab = ({ show }: { show: ShowOptions }) => {
  const { formatMessage } = useIntl();
  const { getUser: {
    key: getUserQueryKey,
    query: getUser
  }, } = useUserApi()

  const { userId } = useAppSelector(x => x.profileReducer);

  const {
    data: user,
    isError,
    isLoading
  } = useQuery([getUserQueryKey], () => getUser(userId!));
  const { handleChangePage, handleChangePageSize, tvShows, tryReload, labelDisplay, remove, toggleFavourite } = useTvShowController();
  return (<>
    <Grid container spacing={2}>
      {show === 'all' && !isUndefined(user) && !isUndefined(tvShows) ?
        <TvShowsAll tvShows={tvShows?.data} user={user?.response} /> :
        <TvShowsFavourite tvShows={tvShows?.data} user={user?.response} />}
    </Grid>
    {!isUndefined(tvShows) && !isUndefined(tvShows?.totalCount) && !isUndefined(tvShows?.page) && !isUndefined(tvShows?.pageSize) &&
      <TablePagination
        component="div"
        count={tvShows.totalCount}
        page={tvShows.totalCount !== 0 ? tvShows.page - 1 : 0}
        onPageChange={handleChangePage}
        rowsPerPage={tvShows.pageSize}
        onRowsPerPageChange={handleChangePageSize}
        labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
        labelDisplayedRows={labelDisplay}
        showFirstButton
        showLastButton
      />}
  </>
  )
}

export default TvShowsTab