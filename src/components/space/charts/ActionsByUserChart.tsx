import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import {
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

import groupBy from 'lodash.groupby';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useAnalyticsTranslation } from '@/config/i18n';

import { COLORS, DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import { filterActionsByActionTypes } from '../../../utils/utils';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const ActionsByUserChart = (): JSX.Element | null => {
  const { t } = useAnalyticsTranslation();
  const { actions, selectedUsers, selectedActionTypes, allMembers } =
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
    countGroupBy: [CountGroupBy.User, CountGroupBy.ActionType],
    aggregateFunction: AggregateFunction.Sum,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.ActionType],
  });

  if (isLoading || isError) {
    return null;
  }
  const aggregateDataMap = new Map(
    aggregateData?.map((d) => [d.actionType ?? 'Unknown', d.aggregateResult]),
  );

  const users = selectedUsers?.length ? selectedUsers : allMembers;
  const title = t('ACTIONS_BY_USER');
  if (!users) {
    return <EmptyChart chartTitle={title} />;
  }

  const allActions = filterActionsByActionTypes(actions, selectedActionTypes);
  const actionsByUser = groupBy(users, (u) => u.name);

  // for each action type, further group by member id, and then sum the number of actions
  const groupedActions = groupBy(allActions, (a) => a.type);
  const formattedData: { type: any; total: any; others: any }[] = [];

  for (const [type, actionsByType] of Object.entries(groupedActions)) {
    // filter out non selected action types
    if (selectedActionTypes.length && !selectedActionTypes.includes(type)) {
      continue;
    }
    const groupedUsers = groupBy(actionsByType, (a) => a?.member?.id);

    const userActions: any = {
      type,
      total: aggregateDataMap.get(type) ?? 0,
      others: aggregateDataMap.get(type) ?? 0,
    };
    for (const [id, list] of Object.entries(groupedUsers)) {
      users.forEach((user) => {
        if (user.id === id) {
          userActions[user.name] = list.length;
        }
      });
    }
    formattedData.push(userActions);
  }

  formattedData.sort((a, b) => b.total - a.total);

  if (!formattedData.length) {
    return <EmptyChart chartTitle={title} />;
  }

  return (
    <>
      <ChartTitle title={title} />
      <ChartContainer>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="type" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip />
          {Array.from(Object.keys(actionsByUser), (name, index) => (
            <Bar
              key=""
              dataKey={name}
              stackId="1"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </ComposedChart>
      </ChartContainer>
    </>
  );
};

export default ActionsByUserChart;
