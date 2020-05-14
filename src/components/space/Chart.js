import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: 500,
    },
  },
}));

function Chart() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper variant="outlined">
        <Typography>Chart</Typography>
      </Paper>
    </div>
  );
}

export default Chart;
