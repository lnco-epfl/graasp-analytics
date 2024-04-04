import { useContext } from 'react';

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
  TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
  getColorForActionTriggerType,
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
  const types = [...new Set(allActions.map((a) => a.type))];
  const groupedItems = groupByFirstLevelItems(allActions, item);
  const formattedItemsByAction = [];
  const allItems = item && children ? [...children, item] : [];
  for (const [currentPath, items] of Object.entries(groupedItems)) {
    const userActions: {
      name: string;
      total: number;
      [key: string]: string | number;
    } = {
      name: findItemNameByPath(currentPath, allItems),
      total: items.length,
    };
    const groupedActions = groupBy(items, (i) => i.type);
    for (const groupedAction of Object.entries(groupedActions)) {
      userActions[groupedAction[0]] = groupedAction[1].length;
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

  const firstFormattedItemsByUser = formattedItemsByAction.slice(
    0,
    TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
  );
  return (
    <>
      <ChartTitle title={title} />
      <ChartContainer>
        <ComposedChart data={firstFormattedItemsByUser}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis interval={0} dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip />
          {types.map((type) => (
            <Bar
              key=""
              dataKey={type}
              stackId="1"
              fill={getColorForActionTriggerType(type)}
            />
          ))}
        </ComposedChart>
      </ChartContainer>
    </>
  );
};

export default ItemsByActionChart;
