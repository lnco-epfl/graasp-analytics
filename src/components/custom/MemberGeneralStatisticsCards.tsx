import React from 'react';

import { Grid } from '@mui/material';

import { Action, ActionTriggers } from '@graasp/sdk';

import { useAnalyticsTranslation } from '@/config/i18n';

import MyAnalyticsCard from '../common/MyAnalyticCard';

type Props = {
  actionsGroupedByTypes: { [key: string]: Action[] };
};
const MemberGeneralStatisticsCards = ({
  actionsGroupedByTypes,
}: Props): JSX.Element => {
  const { t } = useAnalyticsTranslation();

  return (
    <Grid container spacing={2} p={2}>
      <Grid item md={3} lg={2} sx={{ display: 'flex' }}>
        <MyAnalyticsCard
          title={t('GENERAL_STATISTIC_ITEMS_CREATED')}
          stat={actionsGroupedByTypes[ActionTriggers.Create]?.length ?? 0}
        />
      </Grid>
      <Grid item md={3} lg={2} sx={{ display: 'flex' }}>
        <MyAnalyticsCard
          title={t('GENERAL_STATISTIC_LIKED_ITEMS')}
          stat={actionsGroupedByTypes[ActionTriggers.ItemLike]?.length ?? 0}
        />
      </Grid>
      <Grid item md={3} lg={2} sx={{ display: 'flex' }}>
        <MyAnalyticsCard
          title={t('GENERAL_STATISTIC_DOWNLOADED_ITEMS')}
          stat={actionsGroupedByTypes[ActionTriggers.ItemDownload]?.length ?? 0}
        />
      </Grid>
      <Grid item md={3} lg={2} sx={{ display: 'flex' }}>
        <MyAnalyticsCard
          title={t('GENERAL_STATISTIC_CHAT_CREATED')}
          stat={actionsGroupedByTypes[ActionTriggers.ChatCreate]?.length ?? 0}
        />
      </Grid>
    </Grid>
  );
};

export default MemberGeneralStatisticsCards;
