import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  Label,
} from 'recharts';
import EmptyChart from './EmptyChart';
import {
  getItemsByAccessedCount,
  formatItemsByAccessedCount,
  filterActionsByUser,
  findYAxisMax,
} from '../../../utils/api';
import { CONTAINER_HEIGHT } from '../../../config/constants';
import ItemsSelect from '../functionality/ItemsSelect';
import ItemsByAccessedCountCustomTooltip from '../../custom/ItemsByAccessedCountCustomTooltip';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';

const useStyles = makeStyles((theme) => ({
  selectContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
  typography: { textAlign: 'center' },
}));

const ItemsByAccessedCount = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
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
    selectedUsers.length === 0 ||
    selectedUsers.length === allMembers.length
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

  // if selected user(s) have no actions, render component with message that there are no actions
  if (formattedMostViewedItems.length === 0) {
    return (
      <EmptyChart
        selectedUsers={selectedUsers}
        chartTitle={t('Most Viewed Items')}
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
      <Typography variant="h6" className={classes.typography}>
        {t('Most Viewed Items')}
      </Typography>
      <div className={classes.selectContainer}>
        <ItemsSelect
          actions={filteredActions}
          selectedItemTypes={selectedItemTypes}
          setSelectedItemTypes={setSelectedItemTypes}
        />
      </div>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <BarChart
          data={formattedMostViewedItems}
          margin={{ top: 30, bottom: 20, left: 20, right: 20 }}
        >
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
      </ResponsiveContainer>
    </>
  );
};
export default ItemsByAccessedCount;
