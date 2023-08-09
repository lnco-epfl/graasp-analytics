import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Context } from '@graasp/sdk';
import {
  GraaspLogo,
  Main as GraaspMain,
  Platform,
  PlatformSwitch,
  defaultHostsMapper,
  usePlatformNavigation,
} from '@graasp/ui';

import { HOST_MAP } from '../../config/constants';
import ContextsWrapper from '../context/ContextsWrapper';
import CookiesBanner from '../layout/CookieBanner';
import Footer from '../layout/Footer';
import Navigator from '../layout/Navigator';
import Sidebar from '../layout/Sidebar';
import ChartsLayout from '../space/ChartsLayout';

const platformsHostsMap = defaultHostsMapper({
  [Platform.Builder]: HOST_MAP[Context.Builder],
  [Platform.Player]: HOST_MAP[Context.Player],
  [Platform.Library]: HOST_MAP[Context.Library],
});

const ItemPage = ({ isEmbeded }: { isEmbeded: boolean }): JSX.Element => {
  const theme = useTheme();

  const { itemId } = useParams();
  const getNavigationEvents = usePlatformNavigation(platformsHostsMap, itemId);
  if (isEmbeded) {
    return (
      <main style={{ paddingTop: theme.spacing(2) }}>
        <ContextsWrapper>
          <ChartsLayout />
        </ContextsWrapper>
      </main>
    );
  }

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

  const leftContent = (
    <Box display="flex" ml={2} alignItems="center">
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
  );

  return (
    <GraaspMain
      context={Context.Analytics}
      headerLeftContent={leftContent}
      sidebar={<Sidebar />}
      open
    >
      <CookiesBanner />
      <Navigator />
      <ContextsWrapper>
        <ChartsLayout />
      </ContextsWrapper>
      <Footer />
    </GraaspMain>
  );
};

export default ItemPage;
