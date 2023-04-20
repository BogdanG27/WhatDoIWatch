import { useCallback, useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { AppRoute } from 'routes';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '@application/store';
import { Fade, IconButton, Menu, MenuItem } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { resetProfile } from '@application/state-slices';
import { useAppRouter } from '@infrastructure/hooks/useAppRouter';
import { NavbarLanguageSelector } from '@presentation/components/ui/NavbarLanguageSelector/NavbarLanguageSelector';
import { useOwnUserHasRole } from '@infrastructure/hooks/useOwnUser';
import { UserRoleEnum } from '@infrastructure/apis/client';
import { ColorModeContext } from 'App';
import { ArrowDropDown, ArrowDropDownCircle, ArrowDropDownSharp, DarkMode, LightMode } from '@mui/icons-material';

/**
 * This is the navigation menu that will stay at the top of the page.
 */
export const Navbar = () => {
  const { formatMessage } = useIntl();
  const { loggedIn, name } = useAppSelector(x => x.profileReducer);
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { redirectToHome } = useAppRouter();
  const logout = useCallback(() => {
    dispatch(resetProfile());
    redirectToHome();
  }, [queryClient, dispatch, redirectToHome]);
  const colorModeContext = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return <Box sx={{ flexGrow: 1 }}>
    <AppBar position='fixed' style={{ marginBottom: '2rem' }}>
      <Toolbar>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'white',
          width: "100%",
          padding: "0 10%"
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={AppRoute.Index}>
              <HomeIcon style={{ color: 'white' }} fontSize='large' />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
              <Link style={{ color: 'white' }} to={AppRoute.Library}>
                <Button color="inherit">
                  {formatMessage({ id: "globals.library" })}
                </Button>
              </Link>
              {loggedIn && <Link style={{ color: 'white' }} to={AppRoute.Favourites}>
                <Button color="inherit">
                  {formatMessage({ id: "globals.favourites" })}
                </Button>
              </Link>}
              {isAdmin && <div>
                <Button color='inherit'
                  onClick={handleClick}
                  endIcon={<ArrowDropDownSharp />}
                >
                  {formatMessage({ id: "globals.tables" })}
                </Button>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <Link style={{ color: 'white' }} to={AppRoute.Users}>
                    <MenuItem color="inherit">
                      {formatMessage({ id: "globals.users" })}
                    </MenuItem>
                  </Link>
                  <Link style={{ color: 'white' }} to={AppRoute.UserFiles}>
                    <MenuItem color="inherit">
                      {formatMessage({ id: "globals.files" })}
                    </MenuItem>
                  </Link>
                  <Link style={{ color: 'white' }} to={AppRoute.Actors}>
                    <MenuItem color="inherit">
                      {formatMessage({ id: "globals.actors" })}
                    </MenuItem>
                  </Link>
                  <Link style={{ color: 'white' }} to={AppRoute.Staff}>
                    <MenuItem color="inherit">
                      {formatMessage({ id: "globals.staff" })}
                    </MenuItem>
                  </Link>
                  <Link style={{ color: 'white' }} to={AppRoute.Movies}>
                    <MenuItem color="inherit">
                      {formatMessage({ id: "globals.movies" })}
                    </MenuItem>
                  </Link>
                </Menu>
              </div>}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton style={{ marginRight: "0.5rem" }} onClick={() => colorModeContext.toggleColorMode()}>
              {colorModeContext.mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
            <NavbarLanguageSelector />
            {!loggedIn && (
              <Button color="inherit" style={{ marginLeft: '15px' }}>
                <Link style={{ color: 'white' }} to={AppRoute.Login}>
                  {formatMessage({ id: "globals.login" })}
                </Link>
              </Button>
            )}
            {loggedIn && (
              <Button onClick={logout} color="inherit" style={{ marginLeft: '15px' }}>
                <span style={{ color: isAdmin ? "orangered" : "white" }}>{name}</span>
              </Button>
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
    <Toolbar />
  </Box>
}