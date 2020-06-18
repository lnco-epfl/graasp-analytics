import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import SubspaceList from './SubspaceList';
import { SubspaceDataContext } from '../../contexts/SubspaceDataProvider';

const useStyles = makeStyles((theme) => ({
  spaceName: {
    fontWeight: 900,
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
    marginBottom: theme.spacing(2),
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

function ChartsHeader({ status }) {
  const { currentSpaceName } = useContext(SubspaceDataContext);
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6} className={classes.leftCell}>
          <Typography
            variant="h5"
            color="inherit"
            className={classes.spaceName}
          >
            {currentSpaceName}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.rightCell}>
          <Tooltip
            title={t(
              'Any charts available for this space will be shown below.',
            )}
          >
            <Info color="primary" />
          </Tooltip>
        </Grid>
      </Grid>
      <Typography variant="subtitle1">{status}</Typography>
      <SubspaceList />
    </div>
  );
}

ChartsHeader.propTypes = {
  status: PropTypes.string,
};

ChartsHeader.defaultProps = {
  status: '',
};

export default ChartsHeader;
