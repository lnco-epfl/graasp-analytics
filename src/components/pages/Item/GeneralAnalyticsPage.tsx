import React from 'react';

import { Box } from '@mui/material';

import SectionTitle from '@/components/common/SectionTitle';
import ChartsArea from '@/components/space/charts-layout/ChartsArea';
import GeneralAnalytics from '@/components/space/charts-layout/GeneralAnalytics';
import { useAnalyticsTranslation } from '@/config/i18n';

const GeneralAnalyticsPage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();

  return (
    <Box>
      <SectionTitle title={t('GENERAL_ANALYTICS_TITLE')} />
      <GeneralAnalytics />
      <ChartsArea />
    </Box>
  );
};

export default GeneralAnalyticsPage;
