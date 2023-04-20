import { useTvShowApi } from "@infrastructure/apis/api-management/tvShow";
import { Card, CardContent, CardMedia, Grid, Paper, Rating, Typography } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { useQuery } from "@tanstack/react-query";
import { isUndefined } from "lodash";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

export const TvShowPage = memo(() => {
  const { formatMessage } = useIntl();
  const { guid } = useParams();
  const { getTvShow: { key: getTvShowQueryKey, query: getTvShow } } = useTvShowApi();
  const { data, isError, isLoading } = useQuery([getTvShowQueryKey], () => getTvShow(guid ?? ""));
  const tvShow = data?.response;
  if (isError || isUndefined(tvShow)) {
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
            {tvShow.name}
          </Typography>
          <div style={{ display: "flex", height: "450px" }}>
            <div style={{ margin: "2rem", height: "400px" }} >
              <img
                src={tvShow.imageUrl ?? formatMessage({ id: "global.loadingFailed" })}
                alt={tvShow.name ?? formatMessage({ id: "global.loadingFailed" })}
                style={{ height: '100%', width: 'auto' }}
              />
            </div>
            <div style={{ margin: "2rem", height: "400px", width: "100%" }}>
              <Paper elevation={3} style={{ borderRadius: '0 1rem 1rem 0' }}>
                <div style={{ padding: '2rem' }}>
                  <Typography variant="body1" color="textSecondary" component="p" style={{ marginBottom: '2rem' }}>
                    {tvShow.description}
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2rem' }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                      Release Date:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {tvShow.releaseDate?.getDate() ?? formatMessage({ id: "global.loadingFailed" })}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2rem' }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                      Language:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {tvShow.language}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2rem' }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                      Genre:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {tvShow.genre}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2rem' }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                      Rating:
                    </Typography>
                    <Rating name="rating" value={tvShow.rating} precision={0.1} readOnly />
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginLeft: '0.5rem' }}>
                      ({tvShow.rating})
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '2rem' }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                      Seasons:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {tvShow.seasons?.length}
                    </Typography>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
          {tvShow.actors && tvShow.actors.length > 0 && <Typography variant="h4">
            {formatMessage({ id: "globals.actors" })}
          </Typography>}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {tvShow.actors?.map(actor => (<div key={tvShow.id} style={{ margin: "2rem", width: "100px" }}>
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
          {tvShow.staffMembers && tvShow.staffMembers.length > 0 && <Typography variant="h4">
            {formatMessage({ id: "globals.staff" })}
          </Typography>}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {tvShow.staffMembers?.map(staff => (
              <div key={tvShow.id} style={{ margin: "2rem", width: "100px" }}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" component="h2">
                      {staff.firstName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {staff.lastName}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          {tvShow.seasons && tvShow.seasons.length > 0 && <Typography variant="h4">
            {formatMessage({ id: "globals.seasons" })}
          </Typography>}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {tvShow.seasons?.map(season => (
              <div key={tvShow.id} style={{ margin: "2rem", width: "100px" }}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" component="h2">
                      {season.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {season.numberOfEpisodes}
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
