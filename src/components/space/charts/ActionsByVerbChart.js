import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';
import EmptyChart from './EmptyChart';
import { filterActions } from '../../../utils/array';
import { COLORS, CONTAINER_HEIGHT } from '../../../config/constants';
import { DataContext } from '../../context/DataProvider';
import { formatActionsByVerb, getActionsByVerb } from '../../../utils/api';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

const ActionsByVerbChart = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { actions, allMembers, selectedUsers, selectedActions } =
    useContext(DataContext);

  let actionsByVerb = [];
  if (actions?.size) {
    actionsByVerb = filterActions({
      selectedUsers,
      selectedActions,
      actions,
      allMembersLength: allMembers.size,
      chartFunction: getActionsByVerb,
    });
  }
  const formattedActionsByVerb = formatActionsByVerb(actionsByVerb);
  const title = 'Actions by Verb';
  // if selected user(s) have no actions, render component with message that there are no actions
  if (!formattedActionsByVerb.length) {
    return <EmptyChart selectedUsers={selectedUsers} chartTitle={t(title)} />;
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

export default ActionsByVerbChart;
