import React from 'react';
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
} from 'recharts';
import EmptyChart from './EmptyChart';
import {
  getItemsByAccessedCount,
  formatItemsByAccessedCount,
  filterActionsByUser,
  findYAxisMax,
} from '../../../utils/api';
import { CONTAINER_HEIGHT } from '../../../config/constants';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

const ItemsByAccessedCount = ({ actions, view, allUsers, usersToFilter }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();

  let itemsCount;
  if (
    usersToFilter === null ||
    usersToFilter.length === 0 ||
    usersToFilter.length === allUsers.length
  ) {
    itemsCount = getItemsByAccessedCount(actions);
  } else {
    itemsCount = getItemsByAccessedCount(
      filterActionsByUser(actions, usersToFilter, view),
    );
  }

  const yAxisMax = findYAxisMax(itemsCount);
  const formattedItemsCount = formatItemsByAccessedCount(itemsCount);

  // if selected user(s) have no actions, render component with message that there are no actions
  if (formattedItemsCount.length === 0) {
    return (
      <EmptyChart
        usersToFilter={usersToFilter}
        chartTitle={t('Most Viewed Items')}
      />
    );
  }

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {t('Most Viewed Items')}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <BarChart
          data={formattedItemsCount}
          margin={{ top: 30, bottom: 20, left: 20, right: 20 }}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="displayName" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          <Bar dataKey="count" name="Count" fill={theme.palette.primary.main} />
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
