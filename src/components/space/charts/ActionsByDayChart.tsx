import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import {
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

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
  AVERAGE_COLOR,
  DEFAULT_REQUEST_SAMPLE_SIZE,
  GENERAL_COLOR,
} from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import { filterActions } from '../../../utils/array';
import { formatActionsByDay, getActionsByDay } from '../../../utils/utils';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const ActionsByDayChart = (): JSX.Element | null => {
  const { t } = useAnalyticsTranslation();
  const { actions, selectedUsers, selectedActionTypes } =
    useContext(DataContext);
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

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
    aggregateFunction: AggregateFunction.Avg,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.CreatedDay],
  });

  if (isLoading || isError) {
    return null;
  }

  const title = t('ACTIONS_BY_DAY_TITLE');
  if (!aggregateData?.length) {
    return <EmptyChart chartTitle={title} />;
  }

  // sort by creation date
  const aggregateDataSorted = [...aggregateData];
  aggregateDataSorted.sort((a, b) => {
    if (!a.createdDay || !b.createdDay) {
      return -1;
    }
    return new Date(a.createdDay).getTime() - new Date(b.createdDay).getTime();
  });

  const formatDate = (datestring?: string) => {
    if (!datestring) {
      return 'Unknown';
    }
    return `${new Date(datestring).getDate()}-${
      new Date(datestring).getMonth() + 1
    }-${new Date(datestring).getFullYear()}`;
  };

  const formattedAggregateData = aggregateDataSorted.map((d) => ({
    averageCount: d.aggregateResult,
    date: formatDate(d.createdDay),
  }));

  // actionsByDay is the object passed, after formatting, to the BarChart component below
  // if you remove all names in the react-select dropdown, selectedUsers becomes null
  // if no users are selected (i.e. selectedUsers.size === 0), show all actions
  // if all users are selected (i.e. selectedUsers.size === allMembers.size), also show all actions
  // third condition above is necessary: some actions are made by users NOT in the users list (e.g. user account deleted)
  // e.g. we retrieve 100 total actions and 10 users, but these 10 users have only made 90 actions
  // therefore, to avoid confusion: when all users are selected, show all actions

  let actionsByDay: { [key: string]: number } = {};
  if (actions?.length) {
    actionsByDay = filterActions({
      selectedUsers,
      selectedActionTypes,
      actions,
      chartFunction: getActionsByDay,
    });
  }

  const formattedActionsByDay = formatActionsByDay(actionsByDay);
  const mergedData: {
    date: string;
    count: number;
    averageCount: number;
  }[] = formattedAggregateData.map((o1) =>
    Object.assign(
      o1,
      formattedActionsByDay.find((o2) => o2.date === o1.date) ?? { count: 0 },
    ),
  );

  const maxCountEntry = mergedData.reduce((a, b) =>
    Math.max(a.averageCount, a.count) > Math.max(b.averageCount, b.count)
      ? a
      : b,
  );
  const maxCount = Math.max(maxCountEntry.averageCount, maxCountEntry.count);
  let yAxisMax;
  if (maxCount <= 100) {
    yAxisMax = Math.ceil(maxCount / 10) * 10;
  } else {
    yAxisMax = Math.ceil(maxCount / 100) * 100;
  }

  return (
    <Box width="100%">
      <ChartTitle title={title} />
      <ChartContainer>
        <LineChart
          data={mergedData.map((entry) => ({
            ...entry,
            averageCount: entry.averageCount.toFixed(2),
          }))}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="date" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          <Legend />
          <Line
            dataKey="count"
            name={t('COUNT')}
            stroke={GENERAL_COLOR}
            activeDot={{ r: 6 }}
            strokeWidth={3}
          />
          <Line
            dataKey="averageCount"
            name={t('AVERAGE_COUNT')}
            stroke={AVERAGE_COLOR}
            activeDot={{ r: 6 }}
            strokeWidth={3}
          />
        </LineChart>
      </ChartContainer>
    </Box>
  );
};

export default ActionsByDayChart;
