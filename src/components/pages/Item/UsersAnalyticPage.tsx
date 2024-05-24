import React from 'react';

import { Box } from '@mui/material';

import SectionTitle from '@/components/common/SectionTitle';
import ChartsAlerts from '@/components/space/charts-layout/ChartsAlerts';
import ChartsHeader from '@/components/space/charts-layout/ChartsHeader';
import UsersAnalytics from '@/components/space/charts-layout/UsersAnalytics';
import { useAnalyticsTranslation } from '@/config/i18n';

const UsersAnalyticPage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  return (
    <Box>
      <ChartsHeader />
      <ChartsAlerts />
      <SectionTitle title={t('USERS_ANALYTICS_TITLE')} />
      <UsersAnalytics />
    </Box>
  );
};

export default UsersAnalyticPage;
