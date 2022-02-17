import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const useStyles = makeStyles((theme) => ({
  selectContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
  typography: { textAlign: 'center' },
}));

const ItemsByAccessedCount = ({
  actions: allActions,
  view,
  allUsers,
  usersToFilter,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const [selectedItemTypes, setSelectedItemTypes] = useState([]);

  let filteredActions;
  if (
    usersToFilter === null ||
    usersToFilter.length === 0 ||
    usersToFilter.length === allUsers.length
  ) {
    filteredActions = allActions;
  } else {
    filteredActions = filterActionsByUser(allActions, usersToFilter, view);
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
        usersToFilter={usersToFilter}
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

ItemsByAccessedCount.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  view: PropTypes.string.isRequired,
  allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  usersToFilter: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemsByAccessedCount;
