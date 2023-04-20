import { useMovieApi } from "@infrastructure/apis/api-management/movie";
import { Card, CardContent, CardMedia, Grid, Paper, Rating, Typography } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { useQuery } from "@tanstack/react-query";
import { isUndefined } from "lodash";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

export const MoviePage = memo(() => {
  const { formatMessage } = useIntl();
  const { guid } = useParams();
  const { getMovie: { key: getMovieQueryKey, query: getMovie } } = useMovieApi();
  const { data, isError, isLoading } = useQuery([getMovieQueryKey], () => getMovie(guid ?? ""));
  const movie = data?.response;
  if (isError || isUndefined(movie)) {
    return <>Error</>
  }
  if (isLoading) {
    return <>Loading</>
  }
  return (
    <Fragment>
      <Seo title="MobyLab Web App | Home" />
      <WebsiteLayout>
        <div style={{ padding: '2rem' }}>
          <Typography variant="h4" gutterBottom>
            {movie.name}
          </Typography>
          <div style={{ display: "flex", height: "450px" }}>
            <div style={{ margin: "2rem", height: "400px" }} >
              <img
                src={movie.imageUrl ?? formatMessage({ id: "global.loadingFailed" })}
                alt={movie.name ?? formatMessage({ id: "global.loadingFailed" })}
                style={{ height: '100%', width: 'auto' }}
              />
            </div>
            <div style={{ margin: "2rem", height: "400px", width: "100%" }}>
              <Paper elevation={3} style={{ borderRadius: '0 1rem 1rem 0' }}>
                <div style={{ padding: '2rem' }}>
                  <Typography variant="body1" color="textSecondary" component="p" style={{ marginBottom: '2rem' }}>
                    {movie.description}
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2rem' }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                      Release Date:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {movie.releaseDate?.getDate() ?? formatMessage({ id: "global.loadingFailed" })}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2rem' }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                      Language:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {movie.language}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2rem' }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                      Genre:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {movie.genre}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2rem' }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                      Rating:
                    </Typography>
                    <Rating name="rating" value={movie.rating} precision={0.1} readOnly />
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginLeft: '0.5rem' }}>
                      ({movie.rating})
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2rem' }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                      Duration:
                    </Typography>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
          {movie.actors && movie.actors.length > 0 && <Typography variant="h4">
            {formatMessage({ id: "globals.actors" })}
          </Typography>}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {movie.actors?.map(actor => (<div style={{ margin: "2rem" }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={actor.photoUrl ?? formatMessage({ id: "global.loadingFailed" })}
                  alt={actor.firstName ?? formatMessage({ id: "global.loadingFailed" })}
                />
                <CardContent>
                  <Typography variant="subtitle1" component="h2">
                    {actor.firstName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {actor.lastName}
                  </Typography>
                </CardContent>
              </Card>
            </div>
            ))}
          </div>
          {movie.staffMembers && movie.staffMembers.length > 0 && <Typography variant="h4">
            {formatMessage({ id: "globals.staff" })}
          </Typography>}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {movie.staffMembers?.map(staff => (
              <div style={{ margin: "2rem", width: "100px" }}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" component="h2">
                      {staff.firstName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {staff.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {staff.type}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

        </div>
      </WebsiteLayout>
    </Fragment >
  );
});
