import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { Seo } from "@presentation/components/ui/Seo";
import { errorImageUrl, heroImageUrl } from "@infrastructure/utils/urls";
import { AppRoute } from "routes";
import { useMovieApi } from "@infrastructure/apis/api-management/movie";
import { useQuery } from "@tanstack/react-query";
import { useTvShowApi } from "@infrastructure/apis/api-management/tvShow";
import MediaCard from "@presentation/components/library/MediaCard";

const page = 1;
const pageSizeMovies = 2;
const pageSizeTvShows = 1;

export const HomePage = memo(() => {
  const { formatMessage } = useIntl();
  const { getMovies: { key: queryKeyGetMovies, query: getMovies } } = useMovieApi();
  const { data: moviesData, isError: moviesIsError, isLoading: moviesIsLoading } = useQuery([queryKeyGetMovies, page, pageSizeMovies], () => getMovies({ page, pageSize: pageSizeMovies }));
  const { getTvShows: { key: queryKeyGetTvShows, query: getTvShows } } = useTvShowApi();
  const { data: tvShowsData, isError: tvShowsIsError, isLoading: tvShowsIsLoading } = useQuery([queryKeyGetTvShows, page, pageSizeTvShows], () => getTvShows({ page, pageSize: pageSizeTvShows }));

  return (
    <Fragment>
      <Seo title="MobyLab Web App | Home" />
      <WebsiteLayout>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Link style={{ color: 'white' }} to={AppRoute.Library}>
                <CardMedia
                  component="img"
                  alt="Latest Movie or TV Show"
                  height="500"
                  image={heroImageUrl}
                  title="Latest Movie or TV Show"
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {formatMessage({ id: "labels.heroTitle" })}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {formatMessage({ id: "labels.heroDescription" })}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Featured
            </Typography>
          </Grid>
          {moviesData?.response?.data?.map(movie => <Grid key={movie.id} item xs={12} sm={6} md={4}>
            <MediaCard media={movie} type='movie' />
          </Grid>)}
          {tvShowsData?.response?.data?.map(tvShow => <Grid key={tvShow.id} item xs={12} sm={6} md={4}>
            <MediaCard media={tvShow} type='tvShow' />
          </Grid>)}

        </Grid>
      </WebsiteLayout>
    </Fragment>
  );
});
