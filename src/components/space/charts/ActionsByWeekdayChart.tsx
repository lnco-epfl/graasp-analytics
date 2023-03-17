import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  findYAxisMax,
  formatActionsByWeekday,
  getActionsByWeekday,
} from '../../../utils/api';
import { filterActions } from '../../../utils/array';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import EmptyChart from './EmptyChart';

const ActionsByWeekdayChart = (): JSX.Element => {
  const { t } = useTranslation();
  const { actions, allMembers, selectedUsers, selectedActions } =
    useContext(DataContext);

  // ActionsByWeekday is the object passed, after formatting, to the BarChart component below

  // if you remove all names in the react-select dropdown, selectedUsers becomes null
  // if no users are selected (i.e. selectedUsers.size === 0), show all actions
  // if all users are selected (i.e. selectedUsers.size === allMembers.size), also show all actions
  // third condition above is necessary: some actions are made by users NOT in the users list (e.g. user account deleted)
  // e.g. we retrieve 100 total actions and 10 users, but these 10 users have only made 90 actions
  // therefore, to avoid confusion: when all users are selected, show all actions
  let actionsByWeekday = [];
  if (actions?.size) {
    actionsByWeekday = filterActions({
      selectedUsers,
      selectedActions,
      actions,
      allMembersLength: allMembers.size,
      chartFunction: getActionsByWeekday,
    });
  }
  const yAxisMax = findYAxisMax(actionsByWeekday);
  const formattedActionsByWeekday = formatActionsByWeekday(actionsByWeekday);

  const title = 'Actions By Weekday';
  // if selected user(s) have no actions, render component with message that there are no actions
  if (formattedActionsByWeekday.every((weekday) => weekday.count === 0)) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  return (
    <>
      <ChartTitle>{t('Actions By Weekday')}</ChartTitle>
      <ChartContainer>
        <BarChart data={formattedActionsByWeekday}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis interval={0} dataKey="day" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          <Bar dataKey="count" name={t('Count')} fill="#8884d8" />
        </BarChart>
      </ChartContainer>
    </>
  );
};
export default ActionsByWeekdayChart;
