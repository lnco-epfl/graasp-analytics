import { useContext } from 'react';

import { useTheme } from '@mui/material';

import groupBy from 'lodash.groupby';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useAnalyticsTranslation } from '@/config/i18n';

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
  const { t } = useAnalyticsTranslation();
  const { direction } = useTheme();

  const {
    actions,
    selectedUsers,
    selectedActionTypes,
    allMembers,
    itemChildren: children,
    itemData,
  } = useContext(DataContext);
  const users = selectedUsers?.length ? selectedUsers : allMembers;
  const allActions = filterActionsByActionTypes(actions, selectedActionTypes);
  const userNames = [...new Set(users.map(({ name }) => name))];

  const groupedItems = groupByFirstLevelItems(allActions, itemData);
  const formattedItemsByUser = [];
  const allItems = itemData && children ? [...children, itemData] : [];
  for (const [path, actionsByItem] of Object.entries(groupedItems)) {
    const userActions: {
      total: number;
      name: string;
      [key: string]: number | string;
    } = {
      name: findItemNameByPath(path, allItems),
      total: actionsByItem.length,
    };
    const groupedUsers = groupBy(actionsByItem, (i) => i.member?.id);
    for (const groupedUser of Object.keys(groupedUsers)) {
      users.forEach((user) => {
        if (user.id === groupedUser) {
          userActions[user.name] = groupedUsers[user.id].length;
        }
      });
    }
    formattedItemsByUser.push(userActions);
  }

  // limit to 10 first
  formattedItemsByUser.sort((a, b) => b.total - a.total);

  const title = t(`MOST_INTERACTED_ITEMS_BY_USER`, {
    nb: TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
  });
  if (!formattedItemsByUser.length) {
    return <EmptyChart chartTitle={title} />;
  }
  const firstFormattedItmesByUser = formattedItemsByUser.slice(
    0,
    TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
  );

  return (
    <>
      <ChartTitle title={title} />
      <ChartContainer>
        <ComposedChart data={firstFormattedItmesByUser}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" tick={{ fontSize: 14 }} interval={0} />
          <YAxis
            tick={{ fontSize: 14 }}
            orientation={direction === 'rtl' ? 'right' : 'left'}
          />
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
