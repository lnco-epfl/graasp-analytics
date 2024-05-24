import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Grid, Skeleton } from '@mui/material';

import StyledAlert from '@/components/common/StyledAlert';
import { DataContext } from '@/components/context/DataProvider';
import { ViewDataContext } from '@/components/context/ViewDataProvider';
import ActionsLegend from '@/components/space/charts-layout/ActionsLegend';
import { CONTAINER_HEIGHT } from '@/config/constants';
import { useAnalyticsTranslation } from '@/config/i18n';

const ItemPage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const { view } = useContext(ViewDataContext);
  const { error, isLoading } = useContext(DataContext);

  if (!error && !isLoading) {
    return (
      <>
        <Outlet />
        <ActionsLegend />
      </>
    );
  }

  if (isLoading) {
    return (
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
    );
  }

  return (
    <Box pl={2} pr={2} mb={2} flexGrow={1}>
      <StyledAlert severity="error">
        {t('GET_ITEM_ERROR', { view })}
      </StyledAlert>
    </Box>
  );
};

export default ItemPage;
