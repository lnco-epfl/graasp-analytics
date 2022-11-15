import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@mui/material/styles';

import {
  filterActionsByUser,
  findYAxisMax,
  formatItemsByAccessedCount,
  getItemsByAccessedCount,
} from '../../../utils/api';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import SelectContainer from '../../common/SelectContainer';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import ItemsByAccessedCountCustomTooltip from '../../custom/ItemsByAccessedCountCustomTooltip';
import ItemsSelect from '../functionality/ItemsSelect';
import EmptyChart from './EmptyChart';

const ItemsByAccessedCount = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { view } = useContext(ViewDataContext);
  const {
    actions: allActions,

    allMembers,
    selectedUsers,
  } = useContext(DataContext);
  const [selectedItemTypes, setSelectedItemTypes] = useState([]);

  let filteredActions;
  if (
    selectedUsers === null ||
    selectedUsers.size === 0 ||
    selectedUsers.size === allMembers.size
  ) {
    filteredActions = allActions;
  } else {
    filteredActions = filterActionsByUser(allActions, selectedUsers, view);
  }

  const mostViewedItems = getItemsByAccessedCount(
    filteredActions,
    selectedItemTypes?.map((item) => item.name),
  );
  const yAxisMax = findYAxisMax(mostViewedItems);
  const formattedMostViewedItems = formatItemsByAccessedCount(mostViewedItems);
  const title = 'Most Viewed Items';
  // if selected user(s) have no actions, render component with message that there are no actions
  if (!formattedMostViewedItems.length) {
    return (
      <EmptyChart
        selectedUsers={selectedUsers}
        chartTitle={t(title)}
        selectFilter={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <ItemsSelect
            actions={filteredActions}
            selectedItemTypes={selectedItemTypes}
            setSelectedItemTypes={setSelectedItemTypes}
          />
        }
      />
    );
  }

  return (
    <>
      <ChartTitle>{t(title)}</ChartTitle>
      <SelectContainer>
        <ItemsSelect
          actions={filteredActions}
          selectedItemTypes={selectedItemTypes}
          setSelectedItemTypes={setSelectedItemTypes}
        />
      </SelectContainer>
      <ChartContainer>
        <BarChart data={formattedMostViewedItems}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis
            dataKey="displayName"
            tick={false}
            label={<Label value={t('Item')} fill="grey" />}
          />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip content={<ItemsByAccessedCountCustomTooltip />} />
          <Bar
            dataKey="count"
            name={t('Count')}
            fill={theme.palette.primary.main}
          />
        </BarChart>
      </ChartContainer>
    </>
  );
};
export default ItemsByAccessedCount;
