import Grid from '@mui/material/Grid';

import ActionsByUserChart from '../charts/ActionsByUserChart';
import UsersByActionByChart from '../charts/UsersByActionChart';

const UsersAnalytics = (): JSX.Element => (
  <Grid container>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByUserChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <UsersByActionByChart />
    </Grid>
  </Grid>
);

export default UsersAnalytics;
