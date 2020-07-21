import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ChartsHeader from './ChartsHeader';
import ExportData from './ExportData';
import ChartsAlerts from './ChartsAlerts';
import ActionsChart from './ActionsChart';
import ActionsMap from './ActionsMap';
import Loader from '../common/Loader';
import { SpaceDataContext } from '../../contexts/SpaceDataProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
  },
  warning: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function Charts() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { isLoading, error, metadata } = useContext(SpaceDataContext);
  const { numActionsRetrieved } = metadata;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={classes.root}>
        <Alert severity="error" className={classes.alert}>
          {t('This space does not exist.')}
        </Alert>
      </div>
    );
  }

  if (numActionsRetrieved === 0) {
    return (
      <div>
        <ChartsHeader />
        <div className={classes.warning}>
          <Alert severity="warning" className={classes.alert}>
            {t('This space and its subspaces do not have any actions yet.')}
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ChartsHeader />
      <ExportData />
      <ChartsAlerts />
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
