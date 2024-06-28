import { useContext } from 'react';

import { Alert, Box, Container, Stack, Typography } from '@mui/material';

import { Loader } from '@graasp/ui';

import { format, formatISO } from 'date-fns';
import { groupBy } from 'lodash';

import { useAnalyticsTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';

import DateRange from '../common/DateRange';
import SectionTitle from '../common/SectionTitle';
import MyAnalyticsDateRangeProvider, {
  MyAnalyticsDateRangeDataContext,
} from '../context/MyAnalyticsDateRangeContext';
import MemberGeneralStatisticsCards from '../custom/MemberGeneralStatisticsCards';
import ActionsLegend from '../space/charts-layout/ActionsLegend';
import MemberActionsChart from '../space/charts/MemberActionsChart';

const MyAnalyticsPage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();

  const { dateRange } = useContext(MyAnalyticsDateRangeDataContext);

  const { data, isLoading } = hooks.useMemberActions({
    startDate: formatISO(dateRange.startDate),
    endDate: formatISO(dateRange.endDate),
  });

  const formattedStartDate = format(dateRange.startDate, 'MMMM d, yyyy');
  const formattedEndDate = format(dateRange.endDate, 'MMMM d, yyyy');

  const inputValue = `${formattedStartDate} - ${formattedEndDate}`;

  if (data) {
    const actionsGroupedByTypes = groupBy(data, 'type');

    return (
      <Box p={2}>
        <Container>
          <Stack spacing={1}>
            <Stack
              direction={{ sm: 'column', md: 'row' }}
              justifyContent={{ sm: 'center', md: 'space-between' }}
              spacing={1}
            >
              <SectionTitle title={t('MY_ANALYTICS')} />
              <DateRange />
            </Stack>
            {data.length ? (
              <>
                <MemberGeneralStatisticsCards
                  actionsGroupedByTypes={actionsGroupedByTypes}
                />
                <MemberActionsChart actions={data} />
              </>
            ) : (
              <Typography>
                {t('NO_RESULTS_FOUND', { period: inputValue })}
              </Typography>
            )}
          </Stack>
        </Container>
        <ActionsLegend actionsTypes={Object.keys(actionsGroupedByTypes)} />
      </Box>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return <Alert severity="error">{t('ERROR_FETCHING_DATA')}</Alert>;
};

const MyAnalyticsWrappedWithContext = (): JSX.Element => {
  return (
    <MyAnalyticsDateRangeProvider>
      <MyAnalyticsPage />
    </MyAnalyticsDateRangeProvider>
  );
};
export default MyAnalyticsWrappedWithContext;
