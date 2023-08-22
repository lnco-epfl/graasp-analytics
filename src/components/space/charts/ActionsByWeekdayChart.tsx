import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import {
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
import {
  formatActionsByWeekday,
  getActionsByWeekday,
} from '../../../utils/utils';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const ActionsByWeekdayChart = (): JSX.Element | null => {
  const { t } = useAnalyticsTranslation();
  const { actions, selectedUsers, selectedActionTypes } =
    useContext(DataContext);

  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  const {
    data: aggregateData,
    isLoading,
    isError,
  } = hooks.useAggregateActions({
    itemId,
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    type: selectedActionTypes.toJS(),
    countGroupBy: [CountGroupBy.User, CountGroupBy.CreatedDayOfWeek],
    aggregateFunction: AggregateFunction.Avg,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.CreatedDayOfWeek],
  });

  if (isLoading || isError) {
    return null;
  }

  const title = t('ACTIONS_BY_WEEKDAY');
  if (!aggregateData.size) {
    return <EmptyChart chartTitle={title} />;
  }

  const formattedAggregateData: {
    aggregateResult: number;
    createdDayOfWeek: number;
  }[] = aggregateData
    .toArray()
    .map((d: { aggregateResult: number; createdDayOfWeek: string }) => ({
      aggregateResult: d.aggregateResult,
      createdDayOfWeek: parseFloat(d.createdDayOfWeek),
    }));
  const createdDayOfWeekEntry = formattedAggregateData.map(
    (o) => o.createdDayOfWeek,
  );

  // fill with empty data
  for (let day = 0; day < 7; day += 1) {
    if (!createdDayOfWeekEntry.includes(day)) {
      formattedAggregateData.push({
        aggregateResult: 0.0,
        createdDayOfWeek: day,
      });
    }
  }

  // we don't translate here because we need to compare with the raw data
  const weekdayEnum = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  formattedAggregateData.sort(
    (a, b) => a.createdDayOfWeek - b.createdDayOfWeek,
  );
  const formattedAggregateDataWithWeekday = formattedAggregateData.map((d) => ({
    averageCount: d.aggregateResult,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    day: weekdayEnum[d.createdDayOfWeek],
  }));

  // ActionsByWeekday is the object passed, after formatting, to the BarChart component below

  // if you remove all names in the react-select dropdown, selectedUsers becomes null
  // if no users are selected (i.e. selectedUsers.size === 0), show all actions
  // if all users are selected (i.e. selectedUsers.size === allMembers.size), also show all actions
  // third condition above is necessary: some actions are made by users NOT in the users list (e.g. user account deleted)
  // e.g. we retrieve 100 total actions and 10 users, but these 10 users have only made 90 actions
  // therefore, to avoid confusion: when all users are selected, show all actions
  let actionsByWeekday = {};
  if (actions?.size) {
    actionsByWeekday = filterActions({
      selectedUsers,
      selectedActionTypes,
      actions,
      chartFunction: getActionsByWeekday,
    });
  }

  const formattedActionsByWeekday = formatActionsByWeekday(actionsByWeekday);

  const mergedData = formattedAggregateDataWithWeekday
    .map((o1) =>
      Object.assign(
        o1,
        formattedActionsByWeekday.find((o2) => o2.day === o1.day) ?? {
          count: 0,
        },
      ),
    )
    // translate weekdays
    .map((d) => ({ ...d, day: t(d.day) }));

  return (
    <>
      <ChartTitle title={title} />
      <ChartContainer>
        <BarChart data={mergedData}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis interval={0} dataKey="day" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name={t('COUNT')} fill={GENERAL_COLOR} />
          <Bar
            dataKey="averageCount"
            name={t('AVERAGE_COUNT')}
            fill={AVERAGE_COLOR}
          />
        </BarChart>
      </ChartContainer>
    </>
  );
};
export default ActionsByWeekdayChart;
