import React, { useContext } from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ChartsHeader from './charts-layout/ChartsHeader';
import ChartsAlerts from './charts-layout/ChartsAlerts';
import ChartsArea from './charts-layout/ChartsArea';
import { ViewDataContext } from '../context/ViewDataProvider';
import { DataContext } from '../context/DataProvider';

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

const ChartsLayout = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { view } = useContext(ViewDataContext);
  const { error } = useContext(DataContext);

  return (
    <div>
      <ChartsHeader />
      {error ? (
        <div className={classes.root}>
          <Alert severity="error" className={classes.alert}>
            {t("There was an error retrieving this item's data.", { view })}
          </Alert>
        </div>
      ) : (
        <>
          <ChartsAlerts />
          <ChartsArea />
        </>
      )}
    </div>
  );
};

export default ChartsLayout;
