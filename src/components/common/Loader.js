import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    textAlign: 'center',
    flex: 1,
    margin: theme.spacing(4),
  },
  '@keyframes blinker': {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  additionalText: {
    marginTop: theme.spacing(4),
    animation: '$blinker',
    animationDuration: '2s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
}));

const Loader = () => {
  const classes = useStyles();
  const [showAdditionalText, setShowAdditionalText] = useState(false);

  // after 5 seconds, display 'still loading' text by changing state of showAdditionalText
  useEffect(() => {
    setTimeout(() => {
      setShowAdditionalText(true);
    }, 5000);
  }, []);

  return (
    <Grid container>
      <Grid item className={classes.gridItem}>
        <CircularProgress />
        {showAdditionalText ? (
          <Typography variant="subtitle1" className={classes.additionalText}>
            Still loading...
          </Typography>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Loader;
