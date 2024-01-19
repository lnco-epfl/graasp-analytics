import { useParams } from 'react-router-dom';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import { Context } from '@graasp/sdk';
import {
  GraaspLogo,
  Platform,
  PlatformSwitch,
  defaultHostsMapper,
  usePlatformNavigation,
} from '@graasp/ui';

import { HOST_MAP } from '../../config/constants';
import UserSwitchWrapper from '../common/UserSwitchWrapper';

export const platformsHostsMap = defaultHostsMapper({
  [Platform.Builder]: HOST_MAP[Context.Builder],
  [Platform.Player]: HOST_MAP[Context.Player],
  [Platform.Library]: HOST_MAP[Context.Library],
});

const Header = (): JSX.Element => {
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
      ...getNavigationEvents(Platform.Analytics),
    },
  };

  const rightContent = (
    <Box>
      <UserSwitchWrapper />
    </Box>
  );
  return (
    <header style={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex">
            <GraaspLogo height={40} sx={{ fill: 'white' }} />
            <Typography variant="h6" color="inherit" mr={2} ml={1}>
              Graasp
            </Typography>
            <PlatformSwitch
              selected={Platform.Analytics}
              platformsProps={platformProps}
              disabledColor="#999"
            />
          </Box>
          {rightContent}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
