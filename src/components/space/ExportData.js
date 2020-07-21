import React, { useContext, useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LaunchIcon from '@material-ui/icons/Launch';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TaskDataContext } from '../../contexts/TaskDataProvider';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '200px',
  },
  icon: {
    paddingLeft: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    '&:visited': { color: theme.palette.primary.main },
  },
  '@keyframes blinker': {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  blinkingText: {
    animationName: '$blinker',
    animationDuration: '2s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
}));

const ExportData = () => {
  const classes = useStyles();
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const { isLoading, existingTask, requestFullDataset } = useContext(
    TaskDataContext,
  );

  if (isLoading) {
    return null;
  }

  if (existingTask) {
    if (existingTask.completed) {
      return (
        <div className={classes.container}>
          <a
            href={existingTask.location}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              <Typography>Go to file</Typography>
              <LaunchIcon className={classes.icon} />
            </Button>
          </a>
        </div>
      );
    }
    return (
      <div className={classes.container}>
        <Button variant="outlined" color="primary" className={classes.button}>
          <Typography className={classes.blinkingText}>
            Preparing file ...
          </Typography>
        </Button>
      </div>
    );
  }

  const showLoader = () => {
    setShowButtonLoader(true);
    setTimeout(() => {
      requestFullDataset();
    }, 1500);
  };

  if (showButtonLoader) {
    return (
      <div className={classes.container}>
        <Button variant="outlined" color="primary" className={classes.button}>
          <CircularProgress size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        color="primary"
        onClick={showLoader}
        className={classes.button}
      >
        Request full dataset
      </Button>
    </div>
  );
};

export default ExportData;
