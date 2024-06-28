import React, { useContext } from 'react';

import { Typography, useMediaQuery, useTheme } from '@mui/material';

import { Action } from '@graasp/sdk';

import { format, intervalToDuration } from 'date-fns';
import { countBy, groupBy } from 'lodash';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import ChartContainer from '@/components/common/ChartContainer';
import { MyAnalyticsDateRangeDataContext } from '@/components/context/MyAnalyticsDateRangeContext';
import {
  MAX_BARS_LARGE_SCREEN,
  MAX_BARS_SMALL_SCREEN,
  getColorForActionTriggerType,
} from '@/config/constants';
import { useActionsTranslation, useAnalyticsTranslation } from '@/config/i18n';
import { GroupByInterval } from '@/config/type';
import { groupActions } from '@/utils/utils';

type Props = {
  actions: Action[];
};
const MemberActionsChart = ({ actions }: Props): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const { t: translateAction } = useActionsTranslation();
  const types: string[] = Object.keys(groupBy(actions, 'type'));

  const theme = useTheme();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const { groupInterval, dateRange } = useContext(
    MyAnalyticsDateRangeDataContext,
  );

  const groupedActionsByInterval = groupActions(
    actions,
    groupInterval,
    dateRange.startDate,
    dateRange.endDate,
    isLargeScreen ? MAX_BARS_LARGE_SCREEN : MAX_BARS_SMALL_SCREEN,
  );

  const actionsEntires = Object.entries(groupedActionsByInterval);

  const { months, days, years } = intervalToDuration({
    start: new Date(actionsEntires[0]?.[0]),
    end: new Date(actionsEntires[1]?.[0]),
  });

  // get bar interval
  const freq =
    years && years >= 1
      ? GroupByInterval.Year
      : days === 1
        ? GroupByInterval.Day
        : months === 1 && !days
          ? GroupByInterval.Month
          : 'other';

  const noOfActionTypesOverInterval = actionsEntires.map(
    ([dateString, actions], index) => {
      const actionsOverIntervalTypeCounts = countBy(actions, 'type');

      // getting chart x-axis title for specified interval
      let title = '';
      const date = new Date(dateString);
      const nextDate = new Date(
        actionsEntires[index + 1]?.[0] || dateRange.endDate,
      );

      switch (freq) {
        case GroupByInterval.Day:
          title = format(date, 'MMM dd');
          break;
        case GroupByInterval.Month:
          title = format(date, 'MMM yyyy');
          break;
        case GroupByInterval.Year:
          title = format(date, 'yyyy');
          break;
        default: {
          title = `${format(date, 'MMM dd')} - ${format(nextDate, 'MMM dd')}`;
        }
      }

      return {
        date: title,
        ...actionsOverIntervalTypeCounts,
      };
    },
  );

  return (
    <>
      <Typography variant="h5" fontWeight={700}>
        {t('GENERAL_STATISTICS_ACTIVITY_CHART')}
      </Typography>
      <ChartContainer>
        <ComposedChart data={noOfActionTypesOverInterval}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis interval={0} dataKey="date" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip
            formatter={(value, name: string) => [value, translateAction(name)]}
          />
          <Legend
            formatter={(value) => translateAction(value)}
            align="right"
            layout="horizontal"
          />

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

export default MemberActionsChart;
