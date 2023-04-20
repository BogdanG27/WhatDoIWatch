import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Card, CardContent, CardMedia, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Fragment, memo, useState } from "react";
import { useIntl } from "react-intl";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { useMovieApi } from "@infrastructure/apis/api-management/movie";
import { useQuery } from "@tanstack/react-query";
import usePagination from "@mui/material/usePagination/usePagination";
import { Link } from "react-router-dom";
import { errorImageUrl } from "@infrastructure/utils/urls";
import { AppRoute } from "routes";
import React from "react";
import { TabPanel } from "@presentation/components/library/TabPanel/TabPanel";
import MoviesTab from "@presentation/components/library/Movies/MoviesTab";
import TvShowsTab from "@presentation/components/library/TvShows/TvShowsTab";

const page = 1;
const pageSize = 10;

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export const FavouritesPage = memo(() => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const paddingStyle: React.CSSProperties = {
    paddingBottom: "1rem"
  }

  return (
    <Fragment>
      <Seo title="MobyLab Web App | Home" />
      <WebsiteLayout>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            style={paddingStyle}
          >
            <Tab label={formatMessage({ id: "globals.movies" })} {...tabProps(0)} />
            <Tab label={formatMessage({ id: "globals.tvShows" })} {...tabProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <MoviesTab show="favourites" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TvShowsTab show="favourites" />
        </TabPanel>
      </WebsiteLayout>
    </Fragment>
  );
});
