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

const ItemsByActionChart = () => {
  const { t } = useTranslation();
  const {
    actions,
    allMembers,
    selectedUsers,
    selectedActions,
    itemData: item,
    itemChildren: children,
  } = useContext(DataContext);
  const users = selectedUsers.size ? selectedUsers : allMembers;
  const allActions = filterActionsByActionTypes(actions, selectedActions);
  const types = Object.keys(groupBy('type', allActions));
  const yAxisMax = findYAxisMax(users);

  const groupedItems = groupByFirstLevelItems(allActions, item);
  const formattedItemsByAction = [];
  Object.entries(groupedItems).forEach((groupedItem) => {
    const currentPath = groupedItem[0];
    const userActions = {
      name: findItemNameByPath(currentPath, children.push(item)),
      total: groupedItem[1].length,
    };
    const groupedActions = groupBy('type', groupedItem[1]);
    Object.entries(groupedActions).forEach((groupedAction) => {
      userActions[groupedAction[0]] = groupedAction[1].length;
    });
    formattedItemsByAction.push(userActions);
  });
  formattedItemsByAction.sort((a, b) => b.total - a.total);

  const title = `${TOP_NUMBER_OF_ITEMS_TO_DISPLAY} Most Interacted Items by Action`;
  if (!formattedItemsByAction.length) {
    return <EmptyChart selectedUsers={selectedUsers} chartTitle={t(title)} />;
  }

  const firstFormattedItmesByUser = formattedItemsByAction.slice(
    0,
    TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
  );

  return (
    <>
      <ChartTitle>{t(title)}</ChartTitle>
      <ChartContainer>
        <ComposedChart data={firstFormattedItmesByUser}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis interval={0} dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          {types.map((type, index) => (
            <Bar
              key=""
              dataKey={type}
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

export default ItemsByActionChart;
