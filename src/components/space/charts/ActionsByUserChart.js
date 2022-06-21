import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import EmptyChart from './EmptyChart';
import {
  getActionNumByVerb,
  filterActionsByUser,
  findYAxisMax,
} from '../../../utils/api';
import { COLORS, CONTAINER_HEIGHT } from '../../../config/constants';
import { DataContext } from '../../context/DataProvider';

const ACTION_TYPES = [
  'get',
  'get_children',
  'update',
  'create',
  'delete',
  'copy',
  'move',
];

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

const ActionsByUserChart = () => {
  const maxUsers = 10;
  const title = 'Actions by Most Active Users';
  const { t } = useTranslation();
  const classes = useStyles();
  const { actions, selectedUsers, allMembers } = useContext(DataContext);
  let users;
  if (
    selectedUsers === null ||
    selectedUsers.length === 0 ||
    selectedUsers.length === allMembers.length
  ) {
    users = allMembers;
  } else {
    users = selectedUsers;
  }
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
      }
    });
    formattedActions.push(userActions);
  });

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
        <BarChart
          data={formattedActions}
          margin={{ top: 30, bottom: 20, left: 20, right: 20 }}
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
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ActionsByUserChart;
