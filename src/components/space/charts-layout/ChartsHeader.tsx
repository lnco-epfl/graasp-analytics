import { useContext } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

import { Stack, styled, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DataContext } from '../../context/DataProvider';
import ActionsSelect from '../functionality/ActionsSelect';
import ExportData from '../functionality/ExportData';
import UsersSelect from '../functionality/UsersSelect';
import ViewSelect from '../functionality/ViewSelect';

const CustomRoot = styled('div')(({ theme }) => ({
  flexGrow: 1,
  paddingTop: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  paddingBottom: theme.spacing(1),
}));

const ChartsHeader = (): JSX.Element => {
  const theme = useTheme();
  const { itemData } = useContext(DataContext);
  const { pathname } = useLocation();
  const match = useMatch(pathname);

  if (match) {
    return (
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={{ xs: 2, sm: 3, lg: 4 }}
        p={2}
      >
        <ViewSelect />
        <UsersSelect />
        <ActionsSelect />
      </Stack>
    );
  }

  return (
    <CustomRoot>
      <Grid container>
        <Grid item xs={6} justifyContent="flex-start" alignItems="center">
          <Typography
            variant="h5"
            color="inherit"
            fontWeight={theme.typography.fontWeightBold}
            mr={2}
          >
            {itemData?.name}
          </Typography>
          <ExportData />
        </Grid>
        <Grid item xs={6} justifyContent="flex-end" alignItems="center">
          <ViewSelect />
          <UsersSelect />
          <ActionsSelect />
        </Grid>
      </Grid>
    </CustomRoot>
  );
};

export default ChartsHeader;
