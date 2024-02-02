import { Stack } from '@mui/material';

import ActiveUsersCard from '../charts/ActiveUsersCard';
import ActiveUsersChart from '../charts/ActiveUsersChart';

const GeneralAnalytics = (): JSX.Element => (
  <Stack direction={{ sm: 'column', md: 'row' }} alignItems="center">
    <ActiveUsersCard />
    <ActiveUsersChart />
  </Stack>
);

export default GeneralAnalytics;
