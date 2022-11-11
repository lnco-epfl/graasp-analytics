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
import ActionsByTimeOfDayCustomTooltip from '../../custom/ActionsByTimeOfDayCustomTooltip';

import { filterActions } from '../../../utils/array';
import { CONTAINER_HEIGHT } from '../../../config/constants';
import { DataContext } from '../../context/DataProvider';
import {
  findYAxisMax,
  formatActionsByTimeOfDay,
  getActionsByTimeOfDay,
} from '../../../utils/api';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

const ActionsByTimeOfDayChart = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { actions, allMembers, selectedUsers, selectedActions } =
    useContext(DataContext);

  // actionsByTimeOfDay is the object passed, after formatting, to the BarChart component below
  // if you remove all names in the react-select dropdown, selectedUsers becomes null
  // if no users are selected (i.e. selectedUsers.size === 0), show all actions
  // if all users are selected (i.e. selectedUsers.size === allMembers.size), also show all actions
  // third condition above is necessary: some actions are made by users NOT in the users list (e.g. user account deleted)
  // e.g. we retrieve 100 total actions and 10 users, but these 10 users have only made 90 actions
  // therefore, to avoid confusion: when all users are selected, show all actions
  let actionsByTimeOfDay = [];
  if (actions?.size) {
    actionsByTimeOfDay = filterActions({
      selectedUsers,
      selectedActions,
      actions,
      allMembersLength: allMembers.size,
      chartFunction: getActionsByTimeOfDay,
    });
  }
  const yAxisMax = findYAxisMax(actionsByTimeOfDay);
  const formattedActionsByTimeOfDay =
    formatActionsByTimeOfDay(actionsByTimeOfDay);

  const title = 'Actions by Time of Day';
  // if selected user(s) have no actions, render component with message that there are no actions
  if (
    formattedActionsByTimeOfDay.every((timePeriod) => timePeriod.count === 0)
  ) {
    return <EmptyChart selectedUsers={selectedUsers} chartTitle={t(title)} />;
  }

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {t('Actions by Time of Day')}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <BarChart
          data={formattedActionsByTimeOfDay}
          margin={{ top: 30, bottom: 20, left: 20, right: 20 }}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="timeOfDay" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip content={<ActionsByTimeOfDayCustomTooltip />} />
          <Bar dataKey="count" name={t('Count')} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
export default ActionsByTimeOfDayChart;
