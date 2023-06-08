import React from 'react';

import InfoIcon from '@mui/icons-material/Info';
import { Grid, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';

const ChartTitle = ({ title, description = title }) => (
  <Grid container spacing={2} p={2} alignItems="center" justifyContent="center">
    <Grid item>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
    </Grid>
    <Grid item>
      <Tooltip title={description}>
        <InfoIcon />
      </Tooltip>
    </Grid>
  </Grid>
);

export default ChartTitle;
