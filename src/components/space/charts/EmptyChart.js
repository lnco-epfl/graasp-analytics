import PropTypes from 'prop-types';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { CONTAINER_HEIGHT } from '../../../config/constants';
import ChartTitle from '../../common/ChartTitle';
import SelectContainer from '../../common/SelectContainer';
import { DataContext } from '../../context/DataProvider';

const EmptyChartAlert = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: `${CONTAINER_HEIGHT}px`,
});

const EmptyChart = ({ chartTitle, selectFilter }) => {
  const { t } = useTranslation();
  const { selectedUsers } = useContext(DataContext);

  let message = '';
  if (selectedUsers.size > 1) {
    message = t('No actions to show for these users');
  } else {
    message = t('No actions to show for this user');
  }

  return (
    <>
      <ChartTitle>{chartTitle}</ChartTitle>
      {selectFilter && <SelectContainer>{selectFilter}</SelectContainer>}
      <EmptyChartAlert>
        <Typography>{message}</Typography>
      </EmptyChartAlert>
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
