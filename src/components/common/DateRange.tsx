import React, { useContext, useState } from 'react';
import { DateRangePicker, defaultStaticRanges } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { Box, Popover, TextField } from '@mui/material';

import { format } from 'date-fns';

import i18n, { locales, useAnalyticsTranslation } from '@/config/i18n';

import { MyAnalyticsDateRangeDataContext } from '../context/MyAnalyticsDateRangeContext';

const DateRange = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const { dateRange, setDateRange } = useContext(
    MyAnalyticsDateRangeDataContext,
  );
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formattedStartDate = format(dateRange.startDate, 'MMM d, yyyy');
  const formattedEndDate = format(dateRange.endDate, 'MMM d, yyyy');
  const inputValue = `${formattedStartDate} - ${formattedEndDate}`;

  const defaultStaticRangesTranslatedLabels = defaultStaticRanges.map((r) => ({
    ...r,
    label: t(r.label as string),
  }));

  return (
    <Box margin={{ sm: 'auto', md: 'unset' }}>
      <TextField
        required
        label={t('RANGE_DATE_PICKER_INPUT_LABEL')}
        value={inputValue}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        sx={{ minWidth: '240px' }}
      />
      <Popover
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <DateRangePicker
          onChange={(item) => setDateRange({ ...dateRange, ...item.selection })}
          maxDate={new Date()}
          ranges={[dateRange]}
          locale={locales[i18n.language]}
          staticRanges={defaultStaticRangesTranslatedLabels}
        />
      </Popover>
    </Box>
  );
};

export default DateRange;
