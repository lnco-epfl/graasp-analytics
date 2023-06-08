import Grid from '@mui/material/Grid';

import ActiveUsersCard from '../charts/ActiveUsersCard';
import ActiveUsersChart from '../charts/ActiveUsersChart';

const GeneralAnalytics = (): JSX.Element => (
  <Grid container>
    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
      <ActiveUsersCard />
    </Grid>
    <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
      <ActiveUsersChart />
    </Grid>
  </Grid>
);

export default GeneralAnalytics;
