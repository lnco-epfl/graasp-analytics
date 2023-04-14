import { List } from 'immutable';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  COLORS,
  TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
} from '../../../config/constants';
import {
  filterActionsByActionTypes,
  findItemNameByPath,
  findYAxisMax,
  groupByFirstLevelItems,
} from '../../../utils/api';
import { groupBy } from '../../../utils/array';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import EmptyChart from './EmptyChart';

const ItemsByUserChart = () => {
  const { t } = useTranslation();
  const {
    actions,
    selectedUsers,
    selectedActions,
    allMembers,
    itemChildren: children,
    itemData,
  } = useContext(DataContext);
  const users = selectedUsers.size ? selectedUsers : allMembers;
  const allActions = filterActionsByActionTypes(actions, selectedActions);
  const userNames = Object.keys(groupBy('name', users));
  const yAxisMax = findYAxisMax(users);

  const groupedItems = groupByFirstLevelItems(allActions, itemData);
  const formattedItemsByUser = [];
  Object.entries(groupedItems).forEach(([path, actionsByItem]) => {
    const userActions = {
      name: findItemNameByPath(path, (children ?? List()).push(itemData)),
      total: actionsByItem.length,
    };
    const groupedUsers = groupBy(
      'memberId',
      // add memberId data to root level
      actionsByItem.map((a) => ({ ...a, memberId: a?.member?.id })),
    );
    Object.entries(groupedUsers).forEach((groupedUser) => {
      users.forEach((user) => {
        if (user.id === groupedUser[0]) {
          userActions[user.name] = groupedUser[1].length;
        }
      });
    });
    formattedItemsByUser.push(userActions);
  });

  // limit to 10 first
  formattedItemsByUser.sort((a, b) => b.total - a.total);

  const title = `${TOP_NUMBER_OF_ITEMS_TO_DISPLAY} Most Interacted Items by User`;
  if (!formattedItemsByUser.length) {
    return <EmptyChart selectedUsers={selectedUsers} chartTitle={t(title)} />;
  }
  const firstFormattedItmesByUser = formattedItemsByUser.slice(
    0,
    TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
  );

  return (
    <>
      <ChartTitle>{t(title)}</ChartTitle>
      <ChartContainer>
        <ComposedChart data={firstFormattedItmesByUser}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" tick={{ fontSize: 14 }} interval={0} />
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
      </ChartContainer>
    </>
  );
};

export default ItemsByUserChart;
