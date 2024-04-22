import { Box, Skeleton } from '@mui/material';

const ItemLoaderSkelton = (): JSX.Element => {
  return (
    <Box display="flex" gap={1}>
      <Skeleton variant="rectangular" width={40} height={40}></Skeleton>
      <Skeleton variant="text" width={'100%'}></Skeleton>
    </Box>
  );
};

export default ItemLoaderSkelton;
