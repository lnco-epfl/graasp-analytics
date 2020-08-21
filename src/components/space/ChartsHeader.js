import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation, matchPath } from 'react-router-dom';
import { Tooltip, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ExportData from './ExportData';
import { SpaceDataContext } from '../../contexts/SpaceDataProvider';

const useStyles = makeStyles((theme) => ({
  spaceName: {
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
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
}));

function ChartsHeader({ downloadButton }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { spaceName } = useContext(SpaceDataContext);
  const { pathname } = useLocation();

  const match = matchPath(pathname, {
    path: '/embedded/',
    exact: false,
  });

  if (match) {
    return downloadButton ? (
      <div className={classes.rootAlt}>
        <ExportData />
      </div>
    ) : null;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6} className={classes.leftCell}>
          <Typography
            variant="h5"
            color="inherit"
            className={classes.spaceName}
          >
            {spaceName}
          </Typography>
          {downloadButton ? <ExportData /> : null}
        </Grid>
        <Grid item xs={6} className={classes.rightCell}>
          <Tooltip
            placement="left"
            title={t(
              'Any actions from this space and its subspaces are shown in the charts below.',
            )}
          >
            <Info color="primary" />
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}

ChartsHeader.propTypes = {
  downloadButton: PropTypes.bool.isRequired,
};

export default ChartsHeader;
