import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import FaceIcon from '@mui/icons-material/Face';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import {
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

import { endOfDay, formatISO } from 'date-fns';

import { DataContext } from '@/components/context/DataProvider';
import { useAnalyticsTranslation } from '@/config/i18n';

import { DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import { ViewDataContext } from '../../context/ViewDataProvider';
import StatsCard from './components/StatsCard';

const Icon = <FaceIcon fontSize="large" />;

const ActiveUsersCard = (): JSX.Element | null => {
  const { t } = useAnalyticsTranslation();
  const { view } = useContext(ViewDataContext);
  const { dateRange } = useContext(DataContext);
  const { itemId } = useParams();

  // get total users
  const {
    data: totalUsersData,
    isLoading: totalUsersDataIsLoading,
    isError: totalUsersDataIsError,
  } = hooks.useAggregateActions(itemId, {
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    countGroupBy: [CountGroupBy.User],
    aggregateFunction: AggregateFunction.Count,
    aggregateMetric: AggregateMetric.User,
    aggregateBy: [],
    startDate: formatISO(dateRange.startDate),
    endDate: formatISO(endOfDay(dateRange.endDate)),
  });

  // get aggregate actions
  const {
    data: aggregateData,
    isLoading: isAggregateDataLoading,
    isError: isAggregateDataError,
  } = hooks.useAggregateActions(itemId, {
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    countGroupBy: [CountGroupBy.User, CountGroupBy.CreatedDay],
    aggregateFunction: AggregateFunction.Avg,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.CreatedDay],
    startDate: formatISO(dateRange.startDate),
    endDate: formatISO(endOfDay(dateRange.endDate)),
  });

  if (
    isAggregateDataLoading ||
    isAggregateDataError ||
    totalUsersDataIsLoading ||
    totalUsersDataIsError
  ) {
    return null;
  }

  const totalUsers = totalUsersData?.[0]?.aggregateResult ?? 0;

  const today = new Date();
  today.setDate(today.getDate() - 1);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

  let averageDailyUsersThisMonth = 0;
  let averageDailyUsersThisWeek = 0;
  let usersToday = 0;

  aggregateData?.forEach((o) => {
    if (!o.createdDay) {
      return -1;
    }
    const actionTime = new Date(o.createdDay).getTime();
    if (actionTime > today.getTime()) {
      usersToday += o.aggregateResult;
    }
    if (actionTime > oneWeekAgo.getTime()) {
      averageDailyUsersThisWeek += o.aggregateResult;
    }
    if (actionTime > oneMonthAgo.getTime()) {
      averageDailyUsersThisMonth += o.aggregateResult;
    }
  });
  averageDailyUsersThisWeek /= 7;
  averageDailyUsersThisMonth /= 30;

  return (
    <Grid2 container spacing={2} p={2} flexGrow={1} flexShrink={2}>
      <StatsCard title={t('TOTAL_USERS')} stat={totalUsers} icon={Icon} />
      <StatsCard
        title={t('AVERAGE_DAILY_USERS_MONTH')}
        stat={averageDailyUsersThisMonth.toFixed(3)}
        icon={Icon}
      />
      <StatsCard
        title={t('AVERAGE_DAILY_USERS_WEEK')}
        stat={averageDailyUsersThisWeek.toFixed(3)}
        icon={Icon}
      />
      <StatsCard title={t('USERS_TODAY')} stat={usersToday} icon={Icon} />
    </Grid2>
  );
};

export default ActiveUsersCard;
