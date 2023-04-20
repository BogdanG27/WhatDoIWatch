import { useOwnUser } from '@infrastructure/hooks/useOwnUser'
import { Grid, TablePagination } from '@mui/material'
import { isUndefined } from 'lodash'
import { useIntl } from 'react-intl'
import { ShowOptions } from '../Library.types'
import MediaCard from '../MediaCard'
import { useMovieController } from './Movies.controller'
import { MoviesTabProps } from './MoviesTab.types'

export const MoviesAll = ({ movies, user }: MoviesTabProps) => {

  return <>
    {movies?.map(movie => {
      const isFavourite = user?.favouriteMovies?.some(favMovie => favMovie.id === movie.id);
      console.log(user?.favouriteMovies);
      return <Grid key={movie.id} item xs={12} sm={6} md={4}>
        <MediaCard
          media={movie}
          isFavourite={isFavourite}
          type='movie'
        />
      </Grid>
    })}
  </>
}

export const MoviesFavourite = ({ movies, user }: MoviesTabProps) => {
  console.log(user?.favouriteMovies)
  return <>
    {movies?.filter(movie => user?.favouriteMovies?.some(favMovie => favMovie.id === movie.id)).map(movie => <Grid key={movie.id} item xs={12} sm={6} md={4}>
      <MediaCard
        media={movie}
        isFavourite={true}
        type="movie"
      />
    </Grid>)}
  </>
}

export const MoviesTab = ({ show }: { show: ShowOptions }) => {
  const { formatMessage } = useIntl();
  const user = useOwnUser();
  const { handleChangePage, handleChangePageSize, movies, tryReload, labelDisplay, remove, toggleFavourite } = useMovieController();
  return (<>
    <Grid container spacing={2}>
      {!isUndefined(movies) && <>
        {show === 'all' && <MoviesAll movies={movies?.data} user={user} />}
        {show === 'favourites' && <MoviesFavourite movies={movies?.data} user={user} />}
      </>}
    </Grid>
    {!isUndefined(movies) && !isUndefined(movies?.totalCount) && !isUndefined(movies?.page) && !isUndefined(movies?.pageSize) &&
      <TablePagination
        component="div"
        count={movies.totalCount}
        page={movies.totalCount !== 0 ? movies.page - 1 : 0}
        onPageChange={handleChangePage}
        rowsPerPage={movies.pageSize}
        onRowsPerPageChange={handleChangePageSize}
        labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
        labelDisplayedRows={labelDisplay}
        showFirstButton
        showLastButton
      />}
  </>
  )
}

export default MoviesTab