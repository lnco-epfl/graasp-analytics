import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import { formatActionsByDay, getActionsByDay } from '../../../utils/api';
import { filterActions } from '../../../utils/array';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const ActionsByDayChart = () => {
  const { t } = useTranslation();
  const { actions, selectedUsers, selectedActions, allMembers } =
    useContext(DataContext);
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  // get aggregate actions
  const {
    data: aggregateData,
    isLoading,
    isError,
  } = hooks.useAggregateActions({
    itemId,
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    type: selectedActions?.value,
    countGroupBy: ['user', 'createdDay'],
    aggregateFunction: 'avg',
    aggregateMetric: 'actionCount',
    aggregateBy: ['createdDay'],
  });

  if (isLoading || isError) {
    return null;
  }

  const title = 'Actions by Day';
  if (aggregateData.size === 0) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  const formattedAggregateData = aggregateData
    .toArray()
    .sort((a, b) => a.createdDay.getTime() - b.createdDay.getTime())
    .map((d) => ({
      averageCount: parseFloat(d.aggregateResult).toFixed(2),
      date: `${d.createdDay.getDate()}-${
        d.createdDay.getMonth() + 1
      }-${d.createdDay.getFullYear()}`,
    }));

  // actionsByDay is the object passed, after formatting, to the BarChart component below
  // if you remove all names in the react-select dropdown, selectedUsers becomes null
  // if no users are selected (i.e. selectedUsers.size === 0), show all actions
  // if all users are selected (i.e. selectedUsers.size === allMembers.size), also show all actions
  // third condition above is necessary: some actions are made by users NOT in the users list (e.g. user account deleted)
  // e.g. we retrieve 100 total actions and 10 users, but these 10 users have only made 90 actions
  // therefore, to avoid confusion: when all users are selected, show all actions

  let actionsByDay = [];
  if (actions?.size) {
    actionsByDay = filterActions({
      selectedUsers,
      selectedActions,
      actions,
      allMembersLength: allMembers.size,
      chartFunction: getActionsByDay,
    });
  }

  const formattedActionsByDay = formatActionsByDay(actionsByDay);

  const mergedData = formattedAggregateData.map((o1) =>
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
    <>
      <ChartTitle title={t(title)} />
      <ChartContainer>
        <LineChart data={mergedData}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="date" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          <Legend />
          <Line
            dataKey="count"
            name={t('Count')}
            stroke="#8884d8"
            activeDot={{ r: 6 }}
            strokeWidth={3}
          />
          <Line
            dataKey="averageCount"
            name={t('Average Count')}
            stroke="#F99417"
            activeDot={{ r: 6 }}
            strokeWidth={3}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
};

export default ActionsByDayChart;
