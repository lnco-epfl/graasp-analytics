import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import EmptyChart from './EmptyChart';
import {
  filterActionsByActionTypes,
  filterActionsByUser,
  findYAxisMax,
} from '../../../utils/api';
import { groupBy } from '../../../utils/array';
import { DataContext } from '../../context/DataProvider';
import {
  COLORS,
  CONTAINER_HEIGHT,
  ACTIONS_BY_USER_MAX_DISPLAYED_USERS,
} from '../../../config/constants';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
  composedChart: {
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
}));

const UsersByActionByChart = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { actions, selectedUsers, selectedActions, allMembers } =
    useContext(DataContext);
  const users = selectedUsers.size ? selectedUsers : allMembers;
  const allActions = filterActionsByActionTypes(actions, selectedActions);
  const actionTypes = Object.keys(groupBy('actionType', allActions));
  const yAxisMax = findYAxisMax(users);

  let formattedUsersByAction = [];
  users.forEach((user) => {
    const filteredActions = filterActionsByUser(allActions, [{ id: user.id }]);
    const groupedActions = groupBy('actionType', filteredActions);
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
  const title = 'The Most Active Users';

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
      <Typography variant="h6" className={classes.typography}>
        {t(title)}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <ComposedChart
          data={formattedUsersByAction}
          className={classes.composedChart}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          {actionTypes.map((actionType, index) => (
            <Bar
              key=""
              dataKey={actionType}
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
      </ResponsiveContainer>
    </>
  );
};

export default UsersByActionByChart;
