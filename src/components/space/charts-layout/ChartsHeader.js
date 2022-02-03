import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useMatch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ViewSelect from '../functionality/ViewSelect';
import { BuilderDataContext } from '../../../contexts/BuilderDataProvider';

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
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  rootAlt: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
}));

// eslint-disable-next-line no-unused-vars
const ChartsHeader = ({ downloadButton }) => {
  const classes = useStyles();
  const { itemName } = useContext(BuilderDataContext);
  const { pathname } = useLocation();

  const match = useMatch(pathname, {
    path: '/embedded/',
    exact: false,
  });

  if (match) {
    return (
      <div className={classes.rootAlt}>
        {/* {downloadButton ? <ExportData /> : null} */}
        <ViewSelect />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6} className={classes.leftCell}>
          <Typography variant="h5" color="inherit" className={classes.itemName}>
            {itemName}
          </Typography>
          {/* {downloadButton ? <ExportData /> : null} */}
        </Grid>
        <Grid item xs={6} className={classes.rightCell}>
          <ViewSelect />
        </Grid>
      </Grid>
    </div>
  );
};

ChartsHeader.propTypes = {
  downloadButton: PropTypes.bool.isRequired,
};

export default ChartsHeader;
