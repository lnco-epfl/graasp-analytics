import { useContext } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

import { styled, useTheme } from '@mui/material';
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
      <Grid
        container
        flexGrow={1}
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Grid item xs={4}>
          <ViewSelect />
        </Grid>
        <Grid item xs={4}>
          <UsersSelect />
        </Grid>
        <Grid item xs={4}>
          <ActionsSelect />
        </Grid>
      </Grid>
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
