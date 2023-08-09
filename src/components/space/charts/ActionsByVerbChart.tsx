import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { COLORS, CONTAINER_HEIGHT } from '../../../config/constants';
import { filterActions } from '../../../utils/array';
import { formatActionsByVerb, getActionsByVerb } from '../../../utils/utils';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import EmptyChart from './EmptyChart';

const EmptyChartAlert = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: `${CONTAINER_HEIGHT}px`,
});

const ActionsByVerbChart = (): JSX.Element => {
  const { t } = useTranslation();
  const { actions, selectedUsers, selectedActionTypes } =
    useContext(DataContext);

  let actionsByVerb = {};
  if (actions?.size) {
    actionsByVerb = filterActions({
      selectedUsers,
      selectedActionTypes,
      actions,
      chartFunction: getActionsByVerb,
    });
  }
  const formattedActionsByVerb = formatActionsByVerb(actionsByVerb);
  const title = 'Actions Distributions';

  // if no user is selected, this chart will be the same as Total Actions Distribution
  // instead show an info text
  if (!selectedUsers?.size) {
    return (
      <>
        <ChartTitle title={t(title)} />
        <EmptyChartAlert>
          <Typography>{t('No User Selected')}</Typography>
        </EmptyChartAlert>
      </>
    );
  }

  // if selected user(s) have no actions, render component with message that there are no actions
  if (!formattedActionsByVerb?.length) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  formattedActionsByVerb.sort((a, b) => a.type.localeCompare(b.type));

  return (
    <>
      <ChartTitle title={t(title)} />
      <ChartContainer>
        <PieChart>
          <Pie
            data={formattedActionsByVerb}
            dataKey="percentage"
            nameKey="type"
            fill="#82ca9d"
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
