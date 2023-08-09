import { List } from 'immutable';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ItemRecord } from '@graasp/sdk/frontend';

import {
  COLORS,
  TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
} from '../../../config/constants';
import {
  filterActionsByActionTypes,
  findItemNameByPath,
  groupByFirstLevelItems,
} from '../../../utils/utils';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import EmptyChart from './EmptyChart';

const ItemsByUserChart = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    actions,
    selectedUsers,
    selectedActionTypes,
    allMembers,
    itemChildren: children,
    itemData,
  } = useContext(DataContext);
  const users = selectedUsers?.size ? selectedUsers : allMembers;
  const allActions = filterActionsByActionTypes(actions, selectedActionTypes);
  const userNames = [...new Set(users.map(({ name }) => name).toJS())];

  const groupedItems = groupByFirstLevelItems(allActions, itemData);
  const formattedItemsByUser: any = [];
  const allItems =
    itemData && children ? children.push(itemData) : List<ItemRecord>();
  for (const [path, actionsByItem] of groupedItems) {
    const userActions: any = {
      name: findItemNameByPath(path, allItems),
      total: actionsByItem.size,
    };
    const groupedUsers = actionsByItem.groupBy((i) => i.member?.id);
    for (const groupedUser of groupedUsers) {
      users.forEach((user) => {
        if (user.id === groupedUser[0]) {
          userActions[user.name] = groupedUser[1].size;
        }
      });
    }
    formattedItemsByUser.push(userActions);
  }

  // limit to 10 first
  formattedItemsByUser.sort(
    (a: { total: number }, b: { total: number }) => b.total - a.total,
  );

  const title = `${TOP_NUMBER_OF_ITEMS_TO_DISPLAY} Most Interacted Items by User`;
  if (!formattedItemsByUser.length) {
    return <EmptyChart chartTitle={t(title)} />;
  }
  const firstFormattedItmesByUser = formattedItemsByUser.slice(
    0,
    TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
  );

  return (
    <>
      <ChartTitle title={t(title)} />
      <ChartContainer>
        <ComposedChart data={firstFormattedItmesByUser}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" tick={{ fontSize: 14 }} interval={0} />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip />
          {userNames.map((name, index) => (
            <Bar
              key=""
              dataKey={name}
              stackId="1"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </ComposedChart>
      </ChartContainer>
    </>
  );
};

export default ItemsByUserChart;
