import { Box } from '@mui/material';

import { ResponsiveContainer } from 'recharts';

import { CONTAINER_HEIGHT } from '../../config/constants';

const ChartContainer = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => (
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

export default ChartContainer;
