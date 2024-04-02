import { Box, Skeleton } from '@mui/material';

const ItemLoaderSkelton = (): JSX.Element => {
  return (
    <Box display="flex" gap={1}>
      <Skeleton variant="rectangular" width={16} height={16}></Skeleton>
      <Skeleton variant="text" width={'100%'}></Skeleton>
    </Box>
  );
};

export default ItemLoaderSkelton;
