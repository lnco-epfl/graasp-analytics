import React from 'react';

import Grid from '@mui/material/Grid';

import ActionsByDayChart from '../charts/ActionsByDayChart';
import ActionsByTimeOfDayChart from '../charts/ActionsByTimeOfDayChart';
import ActionsByUserChart from '../charts/ActionsByUserChart';
import ActionsByVerbChart from '../charts/ActionsByVerbChart';
import ActionsByWeekdayChart from '../charts/ActionsByWeekdayChart';
import ActionsMap from '../charts/ActionsMap';
import ItemsByActionChart from '../charts/ItemsByActionChart';
import ItemsByUserChart from '../charts/ItemsByUserChart';
import UsersByActionChart from '../charts/UsersByActionChart';

const ChartsArea = () => (
  <Grid container>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <ActionsByDayChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByTimeOfDayChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByWeekdayChart />
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <ActionsMap />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByVerbChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByUserChart />
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <UsersByActionChart />
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <ItemsByUserChart />
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <ItemsByActionChart />
    </Grid>
  </Grid>
);

export default ChartsArea;
