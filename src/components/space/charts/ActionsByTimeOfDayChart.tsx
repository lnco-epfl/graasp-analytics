import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

import {
  AVERAGE_COLOR,
  DEFAULT_REQUEST_SAMPLE_SIZE,
  GENERAL_COLOR,
} from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import { filterActions } from '../../../utils/array';
import {
  formatActionsByTimeOfDay,
  getActionsByTimeOfDay,
} from '../../../utils/utils';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const ActionsByTimeOfDayChart = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { actions, selectedUsers, selectedActionTypes } =
    useContext(DataContext);
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  const title = 'Actions by Time of Day';

  const {
    data: aggregateData,
    isLoading,
    isError,
  } = hooks.useAggregateActions({
    itemId,
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    type: selectedActionTypes.toJS(),
    countGroupBy: [CountGroupBy.User, CountGroupBy.CreatedTimeOfDay],
    aggregateFunction: AggregateFunction.Avg,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.CreatedTimeOfDay],
  });

  if (isLoading || isError) {
    return null;
  }

  if (!aggregateData.size) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  const formattedAggregateData: {
    averageCount: number;
    timeOfDay: number;
  }[] = aggregateData
    .toArray()
    .map((d: { aggregateResult: number; createdTimeOfDay: string }) => ({
      averageCount: d.aggregateResult,
      timeOfDay: parseFloat(d.createdTimeOfDay),
    }));

  const timeOfDayEntry = formattedAggregateData.map((o) => o.timeOfDay);

  // fill with empty data for missing hour
  for (let hour = 0; hour < 24; hour += 1) {
    if (!timeOfDayEntry.includes(hour)) {
      formattedAggregateData.push({
        averageCount: 0.0,
        timeOfDay: hour,
      });
    }
  }

  // actionsByTimeOfDay is the object passed, after formatting, to the BarChart component below
  // if you remove all names in the react-select dropdown, selectedUsers becomes null
  // if no users are selected (i.e. selectedUsers.size === 0), show all actions
  // if all users are selected (i.e. selectedUsers.size === allMembers.size), also show all actions
  // third condition above is necessary: some actions are made by users NOT in the users list (e.g. user account deleted)
  // e.g. we retrieve 100 total actions and 10 users, but these 10 users have only made 90 actions
  // therefore, to avoid confusion: when all users are selected, show all actions
  let actionsByTimeOfDay = {};
  if (actions?.size) {
    actionsByTimeOfDay = filterActions({
      selectedUsers,
      selectedActionTypes,
      actions,
      chartFunction: getActionsByTimeOfDay,
    });
  }
  const formattedActionsByTimeOfDay =
    formatActionsByTimeOfDay(actionsByTimeOfDay);

  const mergedData = formattedAggregateData.map((o1) =>
    Object.assign(
      o1,
      formattedActionsByTimeOfDay.find(
        (o2) => o2.timeOfDay === o1.timeOfDay,
      ) ?? {
        count: 0,
      },
    ),
  );

  mergedData.sort((a, b) => a.timeOfDay - b.timeOfDay);

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
    <>
      <ChartTitle title={t(title)} />
      <ChartContainer>
        <BarChart data={mergedData}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis interval={0} dataKey="timeOfDay" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name={t('Count')} fill={GENERAL_COLOR} />
          <Bar
            dataKey="averageCount"
            name={t('Average Count')}
            fill={AVERAGE_COLOR}
          />
        </BarChart>
      </ChartContainer>
    </>
  );
};
export default ActionsByTimeOfDayChart;
