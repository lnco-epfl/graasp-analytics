import React from 'react';
import { useParams } from 'react-router-dom';

import { AppBar, Toolbar, Typography } from '@mui/material';

import {
  GraaspLogo,
  Platform,
  PlatformSwitch,
  defaultHostsMapper,
  usePlatformNavigation,
} from '@graasp/ui';

import { Context, HOST_MAP } from '../../config/constants';

export const platformsHostsMap = defaultHostsMapper({
  [Platform.Builder]: HOST_MAP[Context.BUILDER],
  [Platform.Player]: HOST_MAP[Context.PLAYER],
  [Platform.Library]: HOST_MAP[Context.LIBRARY],
});

const Header = () => {
  const { itemId } = useParams();
  const getNavigationEvents = usePlatformNavigation(platformsHostsMap, itemId);

  const platformProps = {
    [Platform.Builder]: {
      ...getNavigationEvents(Platform.Builder),
    },
    [Platform.Player]: {
      ...getNavigationEvents(Platform.Player),
    },
    [Platform.Library]: {
      ...getNavigationEvents(Platform.Library),
    },
    [Platform.Analytics]: {
      disabled: true,
    },
  };
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <GraaspLogo height={40} sx={{ fill: 'white' }} />
          <Typography variant="h6" color="inherit" mr={2} ml={1}>
            Graasp
          </Typography>
          <PlatformSwitch
            selected={Platform.Analytics}
            platformsProps={platformProps}
            disabledColor="#999"
          />
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
