import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import ChartsHeader from './ChartsHeader';
import ActionsChart from './ActionsChart';
import ActionsMap from './ActionsMap';
import { SpaceDataContext } from './SpaceDataProvider';

function Charts() {
  const spaceData = useContext(SpaceDataContext);
  if (spaceData.length === 0) {
    return <div>Loading...</div>;
  }
  if (spaceData[0].error) {
    return <div>{spaceData[0].error}</div>;
  }
  return (
    <div>
      <ChartsHeader />
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <ActionsChart />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <ActionsMap />
        </Grid>
      </Grid>
    </div>
  );
}

export default Charts;
