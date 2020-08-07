import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import LaunchIcon from '@material-ui/icons/Launch';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import LightTooltip from '../common/LightTooltip';
import { TaskDataContext } from '../../contexts/TaskDataProvider';
import TASK_NOT_FOUND from '../../config/errors';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  '@keyframes blinker': {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  initialDownloadButton: {
    color: theme.palette.primary.main,
    fontSize: 30,
    cursor: 'pointer',
  },
  blinkingDownloadButton: {
    color: 'grey',
    cursor: 'pointer',
    fontSize: 30,
    animationName: '$blinker',
    animationDuration: '2s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  finalDownloadButton: {
    color: theme.palette.primary.main,
    fontSize: 26,
    cursor: 'pointer',
  },
  errorDownloadButton: {
    color: 'red',
    fontSize: 30,
  },
}));

const ExportData = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const {
    isLoading,
    existingTask,
    taskGetError,
    taskCreateError,
    requestFullDataset,
  } = useContext(TaskDataContext);

  // isLoading is true when TaskDataContext is still fetching userId/spaceId to determine task status
  // Note: do *NOT* return null if taskGetError === 'Task not found.' (this means it can be created!)
  if (isLoading || (taskGetError && taskGetError.error !== TASK_NOT_FOUND)) {
    return null;
  }

  // if there is an error in task creation, return this
  if (taskCreateError) {
    return (
      <LightTooltip
        title={t(
          'Something went wrong with your request. Please try again later.',
        )}
        placement="right"
        arrow
      >
        <CloudDownloadIcon className={classes.errorDownloadButton} />
      </LightTooltip>
    );
  }

  // if a task exists, return this
  // existingTask is true when (a) a task exists on initial page load
  // or (b) request cycle below this code block is triggered
  if (existingTask) {
    if (existingTask.completed) {
      return (
        <LightTooltip
          title={t('Download the full dataset for this space')}
          placement="right"
          arrow
        >
          <a
            href={existingTask.location}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LaunchIcon className={classes.finalDownloadButton} />
          </a>
        </LightTooltip>
      );
    }
    return (
      <LightTooltip
        title={t('Your file is being prepared...')}
        placement="right"
        arrow
      >
        <CloudDownloadIcon className={classes.blinkingDownloadButton} />
      </LightTooltip>
    );
  }

  // this is for visual purposes; it shows a loading spinner for 1 second, *then* requests full dataset
  // used in the onClick handler of the 'default' return statement below
  // (alternatively, we can just call 'requestFullDataset' in that onClick handler (sans loading spinner))
  const triggerRequest = () => {
    setShowLoadingSpinner(true);
    setTimeout(() => {
      requestFullDataset();
    }, 1000);
  };

  if (showLoadingSpinner) {
    return <CircularProgress size={24} />;
  }

  // default display for when no task or error exists
  return (
    <LightTooltip
      title={t('Request the full dataset for this space')}
      placement="right"
      arrow
    >
      <CloudDownloadIcon
        onClick={triggerRequest}
        className={classes.initialDownloadButton}
      />
    </LightTooltip>
  );
};

export default ExportData;
