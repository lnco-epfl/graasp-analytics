import React, { useContext } from 'react';

import { Box } from '@mui/material';

import SectionTitle from '@/components/common/SectionTitle';
import { DataContext } from '@/components/context/DataProvider';
import AppsAnalytics from '@/components/space/charts-layout/AppsAnalytics';
import { useAnalyticsTranslation } from '@/config/i18n';
import { APPS_ID } from '@/config/selectors';

const AppsAnalyticPage = (): JSX.Element | null => {
  const { t } = useAnalyticsTranslation();
  const { descendantApps } = useContext(DataContext);

  if (descendantApps.length) {
    return (
      <Box id={APPS_ID} paddingTop={2}>
        <SectionTitle title={t('APPS_ANALYTICS_TITLE')} />
        <AppsAnalytics />
      </Box>
    );
  }
  return null;
};

export default AppsAnalyticPage;
