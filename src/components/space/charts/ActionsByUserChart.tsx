import {
  Bar,
  CartesianGrid,
  ComposedChart,
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

import { COLORS, DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import { filterActionsByActionTypes } from '../../../utils/utils';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const ActionsByUserChart = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { actions, selectedUsers, selectedActionTypes, allMembers } =
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
    type: selectedActionTypes.toJS(),
    countGroupBy: [CountGroupBy.User, CountGroupBy.ActionType],
    aggregateFunction: AggregateFunction.Sum,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.ActionType],
  });

  if (isLoading || isError) {
    return null;
  }
  const aggregateDataMap = new Map(
    aggregateData
      .toArray()
      .map((d: { actionType: string; aggregateResult: number }) => [
        d.actionType,
        d.aggregateResult,
      ]),
  );

  const users = selectedUsers?.size ? selectedUsers : allMembers;
  const title = 'Actions by User';
  if (!users) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  const allActions = filterActionsByActionTypes(actions, selectedActionTypes);
  const actionsByUser = users.groupBy((u) => u.name);

  // for each action type, further group by member id, and then sum the number of actions
  const groupedActions = allActions.groupBy((a) => a.type);
  const formattedData: { type: any; total: any; others: any }[] = [];

  for (const [type, actionsByType] of groupedActions.entries()) {
    // filter out non selected action types
    if (selectedActionTypes.size && !selectedActionTypes.includes(type)) {
      continue;
    }
    const groupedUsers = actionsByType.groupBy((a) => a?.member?.id);

    const userActions: any = {
      type,
      total: aggregateDataMap.get(type) ?? 0,
      others: aggregateDataMap.get(type) ?? 0,
    };
    for (const [id, list] of groupedUsers.entries()) {
      users.forEach((user) => {
        if (user.id === id) {
          userActions[user.name] = list.size;
        }
      });
    }
    formattedData.push(userActions);
  }

  formattedData.sort((a, b) => b.total - a.total);

  if (!formattedData.length) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  return (
    <>
      <ChartTitle title={t(title)} />
      <ChartContainer>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="type" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip />
          {Array.from(actionsByUser.keys(), (name, index) => (
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
