// CustomToolTip used in MostViewedItems chart
// this tooltip adds the category of each item to the box that shows when a bar is hovered
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 600,
  },
  customTooltipDiv: {
    backgroundColor: 'white',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    border: '0.5px solid #cccccc',
  },
  customTooltipCount: {
    color: theme.palette.primary.main,
  },
}));

const ItemsByAccessedCountCustomTooltip = ({ active, payload, label }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  if (active) {
    return (
      <div className={classes.customTooltipDiv}>
        <p className={classes.heading}>{`${label} (${label})`}</p>
        <p>{`${t('Category')}: ${payload[0].payload.category}`}</p>
        <p className={classes.customTooltipCount}>
          {`${t('Count')}: ${payload[0].payload.count}`}
        </p>
      </div>
    );
  }

  return null;
};

export default ItemsByAccessedCountCustomTooltip;
