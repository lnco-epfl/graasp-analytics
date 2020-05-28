import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    textAlign: 'center',
    flex: 1,
    margin: theme.spacing(4),
  },
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item className={classes.gridItem}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default Loader;
