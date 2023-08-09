import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import TouchAppIcon from '@mui/icons-material/TouchApp';
import { CardContent, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import {
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

import { DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import { ViewDataContext } from '../../context/ViewDataProvider';

const CustomRoot = styled(Card)(() => ({
  maxHeight: 150,
  marginBottom: 5,
  textAlign: 'right',
  margin: 20,
}));

const ActiveUsersCard = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  const {
    data: aggregateData,
    isLoading: aggregateDataIsLoading,
    isError: aggregateDataIsError,
  } = hooks.useAggregateActions({
    itemId,
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    countGroupBy: [CountGroupBy.User, CountGroupBy.CreatedDay],
    aggregateFunction: AggregateFunction.Sum,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.CreatedDay],
  });

  if (aggregateDataIsLoading || aggregateDataIsError) {
    return null;
  }

  const today = new Date();
  today.setDate(today.getDate() - 1);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

  let totalActions = 0;
  let totalActionsThisMonth = 0;
  let totalActionsThisWeek = 0;
  let totalActionsToday = 0;

  (
    aggregateData.toArray() as { createdDay: Date; aggregateResult: number }[]
  ).forEach(({ aggregateResult, createdDay }) => {
    const actionTime = createdDay.getTime();
    totalActions += aggregateResult;
    if (actionTime > today.getTime()) {
      totalActionsToday += aggregateResult;
    }
    if (actionTime > oneWeekAgo.getTime()) {
      totalActionsThisWeek += aggregateResult;
    }
    if (actionTime > oneMonthAgo.getTime()) {
      totalActionsThisMonth += aggregateResult;
    }
  });

  return (
    <>
      <CustomRoot variant="outlined">
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <TouchAppIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Total actions')}
                <Typography variant="h5" component="div" align="center">
                  {totalActions}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
      <CustomRoot variant="outlined">
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <TouchAppIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Actions this month')}
                <Typography variant="h5" component="div" align="center">
                  {totalActionsThisMonth}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
      <CustomRoot variant="outlined">
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <TouchAppIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Actions this week')}
                <Typography variant="h5" component="div" align="center">
                  {totalActionsThisWeek}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
      <CustomRoot variant="outlined">
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <TouchAppIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Actions today')}
                <Typography variant="h5" component="div" align="center">
                  {totalActionsToday}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
    </>
  );
};

export default ActiveUsersCard;
