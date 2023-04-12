import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../../../config/constants';
import { formatActionsByVerb, getActionsByVerb } from '../../../utils/api';
import { filterActions } from '../../../utils/array';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import EmptyChart from './EmptyChart';

const ActionsByVerbChart = () => {
  const { t } = useTranslation();
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
      <ChartTitle>{t('Actions by Verb')}</ChartTitle>
      <ChartContainer>
        <PieChart fontSize={14}>
          <Pie
            data={formattedActionsByVerb}
            dataKey="percentage"
            nameKey="type"
            fill="#82ca9d"
            unit="%"
            label={({ value }) => `${value}%`}
          >
            {formattedActionsByVerb.map((entry, index) => (
              <Cell key={entry.type} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ChartContainer>
    </>
  );
};

export default ActionsByVerbChart;
