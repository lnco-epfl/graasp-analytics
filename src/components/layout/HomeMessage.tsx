import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Box, Stack, Typography } from '@mui/material';

import { useAnalyticsTranslation } from '@/config/i18n';

const HomeMessage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  return (
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
          {t('NO_ITEM_SELECTED')}
        </Typography>
      </Stack>
    </Box>
  );
};
export default HomeMessage;
