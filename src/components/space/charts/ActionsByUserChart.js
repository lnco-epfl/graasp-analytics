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
  getActionNumByVerb,
  filterActionsByUser,
  findYAxisMax,
} from '../../../utils/api';
import { COLORS, CONTAINER_HEIGHT } from '../../../config/constants';
import { DataContext } from '../../context/DataProvider';
import {
  ACTIONS_BY_USER_MAX_DISPLAYED_USERS,
  ACTION_TYPES,
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

const ActionsByUserChart = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { actions, selectedUsers, allMembers } = useContext(DataContext);
  const users = selectedUsers.length ? selectedUsers : allMembers;
  const yAxisMax = findYAxisMax(users);
  let formattedActions = [];

  users.forEach((user) => {
    const actionsByVerb = getActionNumByVerb(
      filterActionsByUser(actions, [{ id: user.id }]),
    );
    const userActions = {
      id: user.id,
      name: user.name,
      total: actionsByVerb.total,
    };
    ACTION_TYPES.forEach((actionType) => {
      if (actionsByVerb[actionType]) {
        userActions[actionType] = actionsByVerb[actionType];
      } else {
        userActions[actionType] = 0;
      }
    });
    formattedActions.push(userActions);
  });

  const maxUsers = ACTIONS_BY_USER_MAX_DISPLAYED_USERS;
  const title = 'Actions by Most Active Users';

  // sort by total actions in descending order
  formattedActions.sort((a, b) => b.total - a.total);
  // get top 10 users
  formattedActions = formattedActions.slice(0, maxUsers);
  // filter out users with no actions
  formattedActions = formattedActions.filter((user) => user.total);

  if (formattedActions.length === 0) {
    return <EmptyChart selectedUsers={selectedUsers} chartTitle={t(title)} />;
  }

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {t(title)}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <ComposedChart
          data={formattedActions}
          className={classes.composedChart}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          {ACTION_TYPES.map((actionType, index) => (
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

export default ActionsByUserChart;
