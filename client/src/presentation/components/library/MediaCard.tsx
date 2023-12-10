import { errorImageUrl } from '@infrastructure/utils/urls'
import { Favorite } from '@mui/icons-material'
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppRoute } from 'routes'
import { Media } from './Library.types'
import { useIntl } from 'react-intl'
import { useUserApi } from '@infrastructure/apis/api-management'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMovieController } from './Movies/Movies.controller'
import { useTvShowController } from './TvShows/TvShow.controller'

interface MediaCardProps {
  media: Media,
  isFavourite?: boolean,
  type: "movie" | "tvShow"
}

const MediaCard: React.FC<MediaCardProps> = ({ media, isFavourite, type }) => {
  const [favourite, setFavourite] = useState(isFavourite)
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const color = favourite ? "red" : "white";

  const { toggleFavourite: toggleFavouriteMovie } = useMovieController();
  const { toggleFavourite: toggleFavouriteTvShow } = useTvShowController();
  const link = type === 'movie' ? AppRoute.Movie : AppRoute.TvShow;

  const handleToggleFavourite = (e: any) => {
    e.preventDefault();
    if (!media.id)
      return;
    if (type === 'movie') {
      toggleFavouriteMovie(media.id);
      setFavourite(prevFavourite => !prevFavourite);
    } else {
      toggleFavouriteTvShow(media.id);
      setFavourite(prevFavourite => !prevFavourite);
    }
  }

  return (
    <Card style={{ height: "100%" }}>
      <Link to={link + `/${media.id}`}>
        <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="h2">
              {media.name ?? formatMessage({ id: "globals.loadingFailed" })}
            </Typography>
            <IconButton onClick={handleToggleFavourite} style={{ alignSelf: 'top' }}>
              <Favorite style={{ color: color }} />
            </IconButton>
          </div>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="body2" color="textSecondary" component="p">
              {media.description?.substring(0, 50) + "..." ?? formatMessage({ id: "globals.loadingFailed" })}
            </Typography>
          </div>
          <Typography variant="h6" color="textSecondary" component="p" >
            {`Rating: ${media.rating}/10 (${media.numberOfRatings}) ` ?? formatMessage({ id: "globals.loadingFailed" })}
          </Typography>
        </CardContent>
      </Link>
    </Card >
  )
}

export default MediaCard