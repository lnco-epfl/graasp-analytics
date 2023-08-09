import Grid from '@mui/material/Grid';

import ActionsByDayChart from '../charts/ActionsByDayChart';
import ActionsByTimeOfDayChart from '../charts/ActionsByTimeOfDayChart';
import ActionsByVerbChart from '../charts/ActionsByVerbChart';
import ActionsByWeekdayChart from '../charts/ActionsByWeekdayChart';
import ActionsCard from '../charts/ActionsCard';
import ActionsMap from '../charts/ActionsMap';
import TotalActionsByVerbChart from '../charts/TotalActionsByVerbChart';

const ChartsArea = (): JSX.Element => (
  <Grid container>
    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
      <ActionsCard />
    </Grid>
    <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
      <ActionsByDayChart />
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
      <ActionsByTimeOfDayChart />
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
      <ActionsByWeekdayChart />
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <ActionsMap />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByVerbChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <TotalActionsByVerbChart />
    </Grid>
  </Grid>
);

export default ChartsArea;
