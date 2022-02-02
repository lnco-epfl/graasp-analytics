import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';
import EmptyChart from './EmptyChart';
import {
  getActionsByVerb,
  formatActionsByVerb,
  filterActionsByUser,
} from '../../../utils/api';
import { COLORS, CONTAINER_HEIGHT } from '../../../config/constants';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

const ActionsByVerbChart = ({ actions, allUsers, usersToFilter }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  let actionsByVerb;
  if (
    usersToFilter === null ||
    usersToFilter.length === 0 ||
    usersToFilter.length === allUsers.length
  ) {
    actionsByVerb = getActionsByVerb(actions);
  } else {
    actionsByVerb = getActionsByVerb(
      filterActionsByUser(actions, usersToFilter),
    );
  }
  const formattedActionsByVerb = formatActionsByVerb(actionsByVerb);

  // if selected user(s) have no actions, render component with message that there are no actions
  if (formattedActionsByVerb.length === 0) {
    return (
      <EmptyChart
        usersToFilter={usersToFilter}
        chartTitle={t('Actions by Verb')}
      />
    );
  }

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {t('Actions by Verb')}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <PieChart fontSize={14}>
          <Pie
            data={formattedActionsByVerb}
            dataKey="percentage"
            nameKey="actionType"
            fill="#82ca9d"
            unit="%"
            label={({ value }) => `${value}%`}
          >
            {formattedActionsByVerb.map((entry, index) => (
              <Cell
                key={entry.actionType}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

ActionsByVerbChart.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  usersToFilter: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionsByVerbChart;
