import React, { useContext } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ActionsSelect from '../functionality/ActionsSelect';
import UsersSelect from '../functionality/UsersSelect';
import ViewSelect from '../functionality/ViewSelect';
import { DataContext } from '../../context/DataProvider';
import ExportData from '../functionality/ExportData';
import ReportData from '../functionality/ReportData';

const useStyles = makeStyles((theme) => ({
  itemName: {
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(2),
  },
  leftCell: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightCell: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(1),
  },
  rootAlt: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
}));

const ChartsHeader = () => {
  const classes = useStyles();
  const { itemName } = useContext(DataContext);
  const { pathname } = useLocation();
  const match = useMatch(pathname, {
    path: '/embedded/',
    exact: false,
  });

  if (match) {
    return (
      <Grid container className={classes.rootAlt}>
        <Grid item xs={8}>
          <ExportData />
          <ViewSelect />
          <UsersSelect />
          <ActionsSelect />
        </Grid>
        <Grid item xs={4}>
          <ReportData />
        </Grid>
      </Grid>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6} className={classes.leftCell}>
          <Typography variant="h5" color="inherit" className={classes.itemName}>
            {itemName}
          </Typography>
          <ExportData />
        </Grid>
        <Grid item xs={6} className={classes.rightCell}>
          <ViewSelect />
          <UsersSelect />
          <ActionsSelect />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChartsHeader;
