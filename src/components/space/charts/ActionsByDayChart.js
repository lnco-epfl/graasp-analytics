import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
  getActionsByDay,
  formatActionsByDay,
  filterActionsByUser,
  findYAxisMax,
} from '../../../utils/api';
import { CONTAINER_HEIGHT } from '../../../config/constants';
import { DataContext } from '../../context/DataProvider';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

const ActionsByDayChart = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const { actions, selectedUsers, allMembers } = useContext(DataContext);

  // actionsByDay is the object passed, after formatting, to the BarChart component below
  // if you remove all names in the react-select dropdown, selectedUsers becomes null
  // if no users are selected (i.e. selectedUsers.length === 0), show all actions
  // if all users are selected (i.e. selectedUsers.length === allMembers.length), also show all actions
  // third condition above is necessary: some actions are made by users NOT in the users list (e.g. user account deleted)
  // e.g. we retrieve 100 total actions and 10 users, but these 10 users have only made 90 actions
  // therefore, to avoid confusion: when all users are selected, show all actions
  let actionsByDay;
  if (
    selectedUsers === null ||
    selectedUsers.length === 0 ||
    selectedUsers.length === allMembers.length
  ) {
    actionsByDay = getActionsByDay(actions);
  } else {
    actionsByDay = getActionsByDay(filterActionsByUser(actions, selectedUsers));
  }

  const yAxisMax = findYAxisMax(actionsByDay);
  const formattedActionsByDay = formatActionsByDay(actionsByDay);

  // if selected user(s) have no actions, render component with message that there are no actions
  if (formattedActionsByDay.length === 0) {
    return (
      <EmptyChart
        selectedUsers={selectedUsers}
        chartTitle={t('Actions by Day')}
      />
    );
  }

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {t('Actions by Day')}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <BarChart
          data={formattedActionsByDay}
          margin={{ top: 30, bottom: 20, left: 20, right: 20 }}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="date" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          <Bar
            dataKey="count"
            name={t('Count')}
            fill={theme.palette.primary.main}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ActionsByDayChart;
