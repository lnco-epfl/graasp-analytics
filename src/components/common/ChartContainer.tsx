import { Box } from '@mui/material';

import { ResponsiveContainer } from 'recharts';

import { CONTAINER_HEIGHT } from '../../config/constants';

const ChartContainer = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => (
  <Box width="100%" p={2}>
    <ResponsiveContainer width="100%" height={CONTAINER_HEIGHT}>
      {children}
    </ResponsiveContainer>
  </Box>
);

export default ChartContainer;
