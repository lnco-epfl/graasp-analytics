import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import TouchAppIcon from '@mui/icons-material/TouchApp';
import { CardContent, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import { ViewDataContext } from '../../context/ViewDataProvider';

const CustomRoot = styled(Card)(() => ({
  maxHeight: 150,
  marginBottom: 5,
  textAlign: 'right',
  margin: 20,
}));

const ActiveUsersCard = (): JSX.Element => {
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
    type: null,
    countGroupBy: ['user', 'createdDay'],
    aggregateFunction: 'sum',
    aggregateMetric: 'actionCount',
    aggregateBy: ['createdDay'],
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

  aggregateData.toArray().forEach((o) => {
    const actionTime = o.createdDay.getTime();
    totalActions += parseInt(o.aggregateResult, 10);
    if (actionTime > today) {
      totalActionsToday += parseInt(o.aggregateResult, 10);
    }
    if (actionTime > oneWeekAgo) {
      totalActionsThisWeek += parseInt(o.aggregateResult, 10);
    }
    if (actionTime > oneMonthAgo) {
      totalActionsThisMonth += parseInt(o.aggregateResult, 10);
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
