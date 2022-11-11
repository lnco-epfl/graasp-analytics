import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CONTAINER_HEIGHT } from '../../../config/constants';
import { DataContext } from '../../context/DataProvider';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
  emptyChartAlert: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: `${CONTAINER_HEIGHT}px`,
  },
  selectContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1em',
  },
}));

const EmptyChart = ({ chartTitle, selectFilter }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { selectedUsers } = useContext(DataContext);

  let message = '';
  if (selectedUsers.size > 1) {
    message = t('No actions to show for these users');
  } else {
    message = t('No actions to show for this user');
  }

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {chartTitle}
      </Typography>
      {selectFilter && (
        <div className={classes.selectContainer}>{selectFilter}</div>
      )}
      <div className={classes.emptyChartAlert}>
        <Typography>{message}</Typography>
      </div>
    </>
  );
};

EmptyChart.propTypes = {
  chartTitle: PropTypes.string.isRequired,
  selectFilter: PropTypes.element,
};

EmptyChart.defaultProps = {
  selectFilter: null,
};

export default EmptyChart;
