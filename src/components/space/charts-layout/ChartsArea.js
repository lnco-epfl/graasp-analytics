import React from 'react';
import Grid from '@material-ui/core/Grid';
import ActionsByDayChart from '../charts/ActionsByDayChart';
import ActionsMap from '../charts/ActionsMap';
import ActionsByTimeOfDayChart from '../charts/ActionsByTimeOfDayChart';
import ActionsByVerbChart from '../charts/ActionsByVerbChart';

const ChartsArea = () => (
  <Grid container>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByDayChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsMap />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByTimeOfDayChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByVerbChart />
    </Grid>
  </Grid>
);

export default ChartsArea;
