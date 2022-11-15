// CustomToolTip used in MostViewedItems chart
// this tooltip adds the category of each item to the box that shows when a bar is hovered
import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

import { CustomTooltipDiv, CustomTooltipDivCount } from './CustomTooltip';

const ItemsByAccessedCountCustomTooltip = ({ active, payload, label }) => {
  const { t } = useTranslation();

  if (active) {
    return (
      <CustomTooltipDiv>
        <Typography variant="subtitle2">{`${label} (${label})`}</Typography>
        <p>{`${t('Category:')} ${payload[0].payload.category}`}</p>
        <CustomTooltipDivCount>
          {`${t('Count:')} ${payload[0].payload.count}`}
        </CustomTooltipDivCount>
      </CustomTooltipDiv>
    );
  }

  return null;
};

ItemsByAccessedCountCustomTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: {
        count: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
      },
    }),
  ).isRequired,
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default ItemsByAccessedCountCustomTooltip;
