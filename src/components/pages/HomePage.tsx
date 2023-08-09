import { useTranslation } from 'react-i18next';

import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Box, Stack, Typography } from '@mui/material';

import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Navigator from '../layout/Navigator';

const HomePage = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={0}
      minHeight="100vh"
    >
      <Header />
      <Box width="100%">
        <Navigator />
      </Box>
      <Box
        display="flex"
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          width="80%"
        >
          <QueryStatsIcon sx={{ fontSize: 80 }} />
          <Typography variant="h4" textAlign="center">
            {t(
              'Please select an item from the navigator to view the analytics.',
            )}
          </Typography>
        </Stack>
      </Box>
      <Footer />
    </Stack>
  );
};

export default HomePage;
