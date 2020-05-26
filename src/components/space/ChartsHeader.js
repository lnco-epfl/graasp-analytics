import React from 'react';
import { Tooltip, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  cell: {
    display: 'flex',
  },
  root: {
    marginBottom: theme.spacing(2),
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

function ChartsHeader() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6} justify="flex-start" className={classes.cell}>
          <Typography variant="h4" color="inherit" alignItems="center">
            {t('Charts')}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          justify="flex-end"
          alignItems="center"
          className={classes.cell}
        >
          <Tooltip title={t('These are the charts for this space.')}>
            <Info color="primary" />
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChartsHeader;
