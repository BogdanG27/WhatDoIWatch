import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { darkBackgroundImageUrl, lightBackgroundImageUrl } from "@infrastructure/utils/urls";
import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { ActorsPage } from "@presentation/pages/ActorsPage";
import { FavouritesPage } from "@presentation/pages/FavouritesPage";
import { HomePage } from "@presentation/pages/HomePage";
import { LibraryPage } from "@presentation/pages/LibraryPage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { MoviePage } from "@presentation/pages/MoviePage";
import { MoviesPage } from "@presentation/pages/MoviesPage";
import { RegistrationPage } from "@presentation/pages/RegistrationPage";
import { StaffsPage } from "@presentation/pages/StaffPage";
import { TvShowPage } from "@presentation/pages/TvShowPage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { createContext, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: teal,
        divider: teal[200],
        background: {
          default: "white",
        },
      }
      : {
        // palette values for dark mode
        primary: teal,
        divider: teal[700],
        background: {
          default: grey[900],
          paper: teal[900],
        },
        text: {
          primary: '#fff',
          secondary: grey[500],
        },
      }),
  },
});

export const ColorModeContext = createContext({
  mode: "dark",
  toggleColorMode: () => { }
});

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
  const [mode, setMode] = useState<PaletteMode>('dark');
  const colorMode = useMemo(
    () => ({
      mode: mode,
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
        document.body.style.backgroundImage = mode === "dark" ?
          lightBackgroundImageUrl :
          darkBackgroundImageUrl
      },
    }),
    [mode],
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastNotifier />
        {/* This adds the routes and route mappings on the various components. */}
        <Routes>
          <Route path={AppRoute.Index} element={<HomePage />} /> {/* Add a new route with a element as the page. */}
          <Route path={AppRoute.Library} element={<LibraryPage />} />
          <Route path={AppRoute.MovieItem} element={<MoviePage />} />
          <Route path={AppRoute.TvShowItem} element={<TvShowPage />} />
          <Route path={AppRoute.Favourites} element={<FavouritesPage />} /> {/* Add a new route with a element as the page. */}
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Register} element={<RegistrationPage />} />
          {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} {/* If the user doesn't have the right role this route shouldn't be used. */}
          {isAdmin && <Route path={AppRoute.UserFiles} element={<UserFilesPage />} />}
          {isAdmin && <Route path={AppRoute.Actors} element={<ActorsPage />} />}
          {isAdmin && <Route path={AppRoute.Staff} element={<StaffsPage />} />}
          {isAdmin && <Route path={AppRoute.Movies} element={<MoviesPage />} />}
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  </AppIntlProvider >
}
