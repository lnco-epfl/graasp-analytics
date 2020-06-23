import React, { useContext } from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { SpaceDataContext } from '../../contexts/SpaceDataProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
}));

function ChartsAlerts() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { metadata } = useContext(SpaceDataContext);
  const {
    maxTreeLength,
    maxTreeLengthExceeded,
    requestedSampleSize,
    numActionsRetrieved,
  } = metadata;

  const displayWarningMessage = () => {
    if (numActionsRetrieved === 0) {
      return (
        <Alert severity="warning" className={classes.alert}>
          {t('This space and its subspaces do not have any actions yet.')}
        </Alert>
      );
    }
    if (maxTreeLengthExceeded) {
      return (
        <Alert severity="warning" className={classes.alert}>
          {t('space-warning-alert', { maxTreeLength })}
        </Alert>
      );
    }
    return null;
  };

  const displaySampleInfo = () => {
    if (numActionsRetrieved !== 0) {
      return (
        <Alert severity="info" className={classes.alert}>
          {t('actions-info-alert', {
            numActionsRetrieved,
            requestedSampleSize,
          })}
        </Alert>
      );
    }
    return null;
  };

  return (
    <div className={classes.root}>
      {displayWarningMessage()}
      {displaySampleInfo()}
    </div>
  );
}

export default ChartsAlerts;
