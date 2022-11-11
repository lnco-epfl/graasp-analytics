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
import { filterActionsByActionTypes, findYAxisMax } from '../../../utils/api';
import { groupBy } from '../../../utils/array';
import { DataContext } from '../../context/DataProvider';
import { COLORS, CONTAINER_HEIGHT } from '../../../config/constants';

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
  const { actions, selectedUsers, selectedActions, allMembers } =
    useContext(DataContext);
  const users = selectedUsers.size ? selectedUsers : allMembers;
  const allActions = filterActionsByActionTypes(actions, selectedActions);
  const userNames = Object.keys(groupBy('name', users));
  const yAxisMax = findYAxisMax(users);

  const groupedActions = groupBy('actionType', allActions);
  const formattedData = [];
  // for each action type, further group by member id, and then sum the number of actions
  Object.entries(groupedActions).forEach((action) => {
    const groupedUsers = groupBy('memberId', action[1]);
    const userActions = {
      actionType: action[0],
      total: action[1].length,
    };
    Object.entries(groupedUsers).forEach((groupedUser) => {
      users.forEach((user) => {
        if (user.id === groupedUser[0]) {
          userActions[user.name] = groupedUser[1].length;
        }
      });
    });
    formattedData.push(userActions);
  });
  formattedData.sort((a, b) => b.total - a.total);
  const title = 'Actions by User';
  if (!formattedData.length) {
    return <EmptyChart selectedUsers={selectedUsers} chartTitle={t(title)} />;
  }

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {t(title)}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <ComposedChart data={formattedData} className={classes.composedChart}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="actionType" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          {userNames.map((name, index) => (
            <Bar
              key=""
              dataKey={name}
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
