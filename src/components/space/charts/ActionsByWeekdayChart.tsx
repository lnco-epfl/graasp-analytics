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

import { DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import {
  formatActionsByWeekday,
  getActionsByWeekday,
} from '../../../utils/api';
import { filterActions } from '../../../utils/array';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const ActionsByWeekdayChart = (): JSX.Element => {
  const { t } = useTranslation();
  const { actions, allMembers, selectedUsers, selectedActions } =
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
    type: selectedActions?.value,
    countGroupBy: ['user', 'createdDayOfWeek'],
    aggregateFunction: 'avg',
    aggregateMetric: 'actionCount',
    aggregateBy: ['createdDayOfWeek'],
  });

  if (isLoading || isError) {
    return null;
  }

  const title = 'Actions By Weekday';
  if (aggregateData.size === 0) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  let formattedAggregateData = aggregateData.toArray().map((d) => ({
    aggregateResult: parseFloat(d.aggregateResult),
    createdDayOfWeek: parseFloat(d.createdDayOfWeek),
  }));
  const createdDayOfWeekEntry = formattedAggregateData.map(
    (o) => o.createdDayOfWeek,
  );

  for (let day = 0; day < 7; day += 1) {
    if (!createdDayOfWeekEntry.includes(day)) {
      formattedAggregateData.push({
        aggregateResult: 0.0,
        createdDayOfWeek: day,
      });
    }
  }

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
  formattedAggregateData = formattedAggregateData.map((d) => ({
    averageCount: d.aggregateResult,
    day: weekdayEnum[d.createdDayOfWeek],
  }));

  // ActionsByWeekday is the object passed, after formatting, to the BarChart component below

  // if you remove all names in the react-select dropdown, selectedUsers becomes null
  // if no users are selected (i.e. selectedUsers.size === 0), show all actions
  // if all users are selected (i.e. selectedUsers.size === allMembers.size), also show all actions
  // third condition above is necessary: some actions are made by users NOT in the users list (e.g. user account deleted)
  // e.g. we retrieve 100 total actions and 10 users, but these 10 users have only made 90 actions
  // therefore, to avoid confusion: when all users are selected, show all actions
  let actionsByWeekday = [];
  if (actions?.size) {
    actionsByWeekday = filterActions({
      selectedUsers,
      selectedActions,
      actions,
      allMembersLength: allMembers.size,
      chartFunction: getActionsByWeekday,
    });
  }

  const formattedActionsByWeekday = formatActionsByWeekday(actionsByWeekday);

  const mergedData = formattedAggregateData.map((o1) =>
    Object.assign(
      o1,
      formattedActionsByWeekday.find((o2) => o2.day === o1.day) ?? {
        count: 0,
      },
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
    <>
      <ChartTitle title={t(title)} />
      <ChartContainer>
        <BarChart data={mergedData}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis interval={0} dataKey="day" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name={t('Count')} fill="#8884d8" />
          <Bar
            dataKey="averageCount"
            name={t('Average Count')}
            fill="#F99417"
          />
        </BarChart>
      </ChartContainer>
    </>
  );
};
export default ActionsByWeekdayChart;
