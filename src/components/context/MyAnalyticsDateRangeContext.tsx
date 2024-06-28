import { createContext, useMemo, useState } from 'react';

import { addDays, intervalToDuration } from 'date-fns';

import { DateRange, GroupByInterval } from '@/config/type';

const defaultValue: {
  dateRange: DateRange;
  setDateRange: (view: DateRange) => void;
  groupInterval: GroupByInterval;
} = {
  dateRange: {
    startDate: addDays(new Date(), -30),
    endDate: new Date(),
    key: 'selection',
  },
  setDateRange: () => {
    // do nothing
  },
  groupInterval: GroupByInterval.Week,
};

export const MyAnalyticsDateRangeDataContext = createContext(defaultValue);

const MyAnalyticsDateRangeProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [dateRange, setDateRange] = useState({
    startDate: addDays(new Date(), -30),
    endDate: new Date(),
    key: 'selection',
  });

  const { months, days, years } = intervalToDuration({
    start: dateRange.startDate,
    end: dateRange.endDate,
  });

  const groupInterval =
    years && years >= 1
      ? GroupByInterval.Year
      : months && months > 2
        ? GroupByInterval.Month
        : days && days < 8
          ? GroupByInterval.Day
          : GroupByInterval.Week;

  const value = useMemo(
    () => ({
      dateRange,
      setDateRange,
      groupInterval,
    }),
    [dateRange, setDateRange, groupInterval],
  );
  return (
    <MyAnalyticsDateRangeDataContext.Provider value={value}>
      {children}
    </MyAnalyticsDateRangeDataContext.Provider>
  );
};

export default MyAnalyticsDateRangeProvider;
