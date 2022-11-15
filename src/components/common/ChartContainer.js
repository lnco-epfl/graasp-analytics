import PropTypes from 'prop-types';
import { ResponsiveContainer } from 'recharts';

import React from 'react';

import { Box } from '@mui/material';

import { CONTAINER_HEIGHT } from '../../config/constants';

const ChartContainer = ({ children }) => (
  <Box
    sx={{
      marginTop: 3,
      marginBottom: 2,
      marginLeft: 2,
      marginRight: 2,
    }}
  >
    <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
      {children}
    </ResponsiveContainer>
  </Box>
);

ChartContainer.propTypes = {
  children: PropTypes.node,
};

ChartContainer.defaultProps = {
  children: null,
};

export default ChartContainer;
