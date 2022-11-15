import PropTypes from 'prop-types';

import React from 'react';

import Typography from '@mui/material/Typography';

const ChartTitle = ({ children }) => (
  <Typography variant="h6" align="center">
    {children}
  </Typography>
);

ChartTitle.propTypes = {
  children: PropTypes.node,
};
ChartTitle.defaultProps = {
  children: null,
};

export default ChartTitle;
