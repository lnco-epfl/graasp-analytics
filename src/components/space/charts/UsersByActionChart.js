import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ACTIONS_BY_USER_MAX_DISPLAYED_USERS,
  COLORS,
} from '../../../config/constants';
import {
  filterActionsByActionTypes,
  filterActionsByUser,
  findYAxisMax,
} from '../../../utils/api';
import { groupBy } from '../../../utils/array';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import EmptyChart from './EmptyChart';

const UsersByActionByChart = () => {
  const { t } = useTranslation();
  const { actions, selectedUsers, selectedActions, allMembers } =
    useContext(DataContext);
  const users = selectedUsers.size ? selectedUsers : allMembers;
  const allActions = filterActionsByActionTypes(actions, selectedActions);
  const types = Object.keys(groupBy('type', allActions));
  const yAxisMax = findYAxisMax(users);

  let formattedUsersByAction = [];
  users.forEach((user) => {
    const filteredActions = filterActionsByUser(allActions, [{ id: user.id }]);
    const groupedActions = groupBy('type', filteredActions);
    const userActions = {
      id: user.id,
      name: user.name,
      total: 0,
    };
    Object.entries(groupedActions).forEach((action) => {
      userActions[action[0]] = action[1].length;
      userActions.total += action[1].length;
    });
    formattedUsersByAction.push(userActions);
  });
  const maxUsers = ACTIONS_BY_USER_MAX_DISPLAYED_USERS;
  const title = `${ACTIONS_BY_USER_MAX_DISPLAYED_USERS} Most Active Users`;

  // sort by total actions in descending order
  formattedUsersByAction.sort((a, b) => b.total - a.total);
  // get top 10 users
  formattedUsersByAction = formattedUsersByAction.slice(0, maxUsers);
  // filter out users with no actions
  formattedUsersByAction = formattedUsersByAction.filter((user) => user.total);
  if (!formattedUsersByAction.length) {
    return <EmptyChart selectedUsers={selectedUsers} chartTitle={t(title)} />;
  }

  return (
    <>
      <ChartTitle>{t(title)}</ChartTitle>
      <ChartContainer>
        <ComposedChart data={formattedUsersByAction}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          {types.map((type, index) => (
            <Bar
              key=""
              dataKey={type}
              stackId="1"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
          <Line
            dataKey="total"
            name={t('Total')}
            type="monotone"
            stroke="#8884d8"
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ChartContainer>
    </>
  );
};

export default UsersByActionByChart;
