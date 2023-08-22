import { useContext } from 'react';

import { ItemRecord } from '@graasp/sdk/frontend';

import { List } from 'immutable';
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

const ItemsByActionChart = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const {
    actions,
    selectedActionTypes,
    itemData: item,
    itemChildren: children,
  } = useContext(DataContext);
  const allActions = filterActionsByActionTypes(actions, selectedActionTypes);
  const types = [...new Set(allActions.map((a) => a.type).toJS())];

  const groupedItems = groupByFirstLevelItems(allActions, item);
  const formattedItemsByAction: any[] = [];
  const allItems: List<ItemRecord> =
    item && children ? children.push(item) : List();
  for (const [currentPath, items] of groupedItems) {
    const userActions: any = {
      name: findItemNameByPath(currentPath, allItems),
      total: items.size,
    };
    const groupedActions = items.groupBy((i) => i.type);
    for (const groupedAction of groupedActions) {
      userActions[groupedAction[0]] = groupedAction[1].size;
    }
    formattedItemsByAction.push(userActions);
  }
  formattedItemsByAction.sort((a, b) => b.total - a.total);
  const title = t(`MOST_INTERACTED_ITEMS_BY_ACTION`, {
    nb: TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
  });
  if (!formattedItemsByAction.length) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  const firstFormattedItmesByUser = formattedItemsByAction.slice(
    0,
    TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
  );
  return (
    <>
      <ChartTitle title={title} />
      <ChartContainer>
        <ComposedChart data={firstFormattedItmesByUser}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis interval={0} dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip />
          {types.map((type, index) => (
            <Bar
              key=""
              dataKey={type}
              stackId="1"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </ComposedChart>
      </ChartContainer>
    </>
  );
};

export default ItemsByActionChart;
