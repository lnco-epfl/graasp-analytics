import { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Box, styled } from '@mui/material';

import { Context } from '@graasp/sdk';
import {
  Main,
  Platform,
  PlatformSwitch,
  defaultHostsMapper,
  usePlatformNavigation,
} from '@graasp/ui';

import { HOST_MAP } from '@/config/constants';
import { useAnalyticsTranslation } from '@/config/i18n';
import { HOME_PATH } from '@/config/paths';

import UserSwitchWrapper from '../common/UserSwitchWrapper';
import Sidebar from './Sidebar';

export const platformsHostsMap = defaultHostsMapper({
  [Platform.Builder]: HOST_MAP[Context.Builder],
  [Platform.Player]: HOST_MAP[Context.Player],
});

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
}));
const LinkComponent = ({ children }: { children: ReactNode }) => (
  <StyledLink to={HOME_PATH}>{children}</StyledLink>
);

const PageWrapper = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const { itemId } = useParams();

  const getNavigationEvents = usePlatformNavigation(platformsHostsMap, itemId);

  const platformProps = {
    [Platform.Builder]: {
      ...getNavigationEvents(Platform.Builder),
    },
    [Platform.Player]: {
      ...getNavigationEvents(Platform.Player),
    },
    [Platform.Analytics]: {
      ...getNavigationEvents(Platform.Analytics),
    },
  };

  return (
    <Main
      context={Context.Analytics}
      drawerContent={<Sidebar />}
      drawerOpenAriaLabel={t('DRAWER_OPEN_ARIA')}
      headerRightContent={<UserSwitchWrapper />}
      PlatformComponent={
        <PlatformSwitch
          selected={Platform.Analytics}
          platformsProps={platformProps}
          disabledColor="#999"
          color="#ffffff"
          accentColor="#000000"
        />
      }
      LinkComponent={LinkComponent}
    >
      <Box height="100%" display="flex" flexGrow={1} flexDirection="column">
        {children}
      </Box>
    </Main>
  );
};
export default PageWrapper;
