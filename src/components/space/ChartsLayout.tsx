import { useContext } from 'react';

import { Grid, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';

import { useAnalyticsTranslation } from '@/config/i18n';

import { CONTAINER_HEIGHT } from '../../config/constants';
import SectionTitle from '../common/SectionTitle';
import StyledAlert from '../common/StyledAlert';
import { DataContext } from '../context/DataProvider';
import { ViewDataContext } from '../context/ViewDataProvider';
import ChartsAlerts from './charts-layout/ChartsAlerts';
import ChartsArea from './charts-layout/ChartsArea';
import ChartsHeader from './charts-layout/ChartsHeader';
import GeneralAnalytics from './charts-layout/GeneralAnalytics';
import ItemsAnalytics from './charts-layout/ItemsAnalytics';
import UsersAnalytics from './charts-layout/UsersAnalytics';
import ExportData from './functionality/ExportData';

const ChartsLayout = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const { view } = useContext(ViewDataContext);
  const { error, isLoading } = useContext(DataContext);

  return (
    <div>
      <ChartsHeader />
      {error && (
        <Box pl={2} pr={2} mb={2} flexGrow={1}>
          <StyledAlert severity="error">
            {t('GET_ITEM_ERROR', { view })}
          </StyledAlert>
        </Box>
      )}
      {isLoading && (
        <Grid container spacing={2} p={2}>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
          </Grid>
        </Grid>
      )}

      {!error && !isLoading && (
        <>
          <ChartsAlerts />
          <div id="general">
            <SectionTitle
              title={t('GENERAL_ANALYTICS_TITLE')}
              icons={[<ExportData key="export" />]}
            />
            <GeneralAnalytics />
            <ChartsArea />
          </div>
          <div id="users">
            <SectionTitle title={t('USERS_ANALYTICS_TITLE')} />
            <UsersAnalytics />
          </div>
          <div id="items">
            <SectionTitle title={t('ITEMS_ANALYTICS_TITLE')} />
            <ItemsAnalytics />
          </div>
        </>
      )}
    </div>
  );
};

export default ChartsLayout;
