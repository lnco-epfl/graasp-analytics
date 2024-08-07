import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Stack, useTheme } from '@mui/material';

import {
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

import { endOfDay, formatISO } from 'date-fns';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useAnalyticsTranslation } from '@/config/i18n';

import {
  DEFAULT_REQUEST_SAMPLE_SIZE,
  GENERAL_COLOR,
} from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const ActiveUsersChart = (): JSX.Element | null => {
  const { t } = useAnalyticsTranslation();
  const { view } = useContext(ViewDataContext);
  const { selectedActionTypes, dateRange } = useContext(DataContext);
  const { itemId } = useParams();
  const { direction } = useTheme();

  // get aggregate actions
  const {
    data: aggregateData,
    isLoading,
    isError,
  } = hooks.useAggregateActions(itemId, {
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    type: selectedActionTypes,
    countGroupBy: [CountGroupBy.User, CountGroupBy.CreatedDay],
    aggregateFunction: AggregateFunction.Count,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.CreatedDay],
    startDate: formatISO(dateRange.startDate),
    endDate: formatISO(endOfDay(dateRange.endDate)),
  });

  if (isLoading || isError) {
    return null;
  }

  const title = t('ACTIVE_USERS_BY_DAY');
  if (!aggregateData?.length) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  const formatDate = (datestring?: string) => {
    if (!datestring) {
      return 'Unknown';
    }
    return `${new Date(datestring).getDate()}-${
      new Date(datestring).getMonth() + 1
    }-${new Date(datestring).getFullYear()}`;
  };

  const aggregateDataSorted = [...aggregateData];
  aggregateDataSorted.sort((a, b) => {
    if (!a.createdDay || !b.createdDay) {
      return -1;
    }
    return new Date(a.createdDay).getTime() - new Date(b.createdDay).getTime();
  });
  const formattedAggregateData = aggregateDataSorted.map((d) => ({
    count: d.aggregateResult,
    date: formatDate(d.createdDay),
  }));

  const maxCount = formattedAggregateData.reduce(
    (max, cur) => Math.max(max, cur.count),
    0,
  );
  let yAxisMax;
  if (maxCount <= 100) {
    yAxisMax = Math.ceil(maxCount / 10) * 10;
  } else {
    yAxisMax = Math.ceil(maxCount / 100) * 100;
  }

  return (
    <Stack direction="column" flexGrow={3} width="100%">
      <ChartTitle title={title} />
      <ChartContainer>
        <LineChart data={formattedAggregateData}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="date" tick={{ fontSize: 14 }} />
          <YAxis
            tick={{ fontSize: 14 }}
            domain={[0, yAxisMax]}
            orientation={direction === 'rtl' ? 'right' : 'left'}
          />
          <Tooltip />
          <Legend />
          <Line
            dataKey="count"
            name={t('COUNT')}
            stroke={GENERAL_COLOR}
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </Stack>
  );
};

export default ActiveUsersChart;
