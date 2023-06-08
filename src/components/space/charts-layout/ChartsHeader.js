import React, { useContext } from 'react';
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

const ChartsHeader = () => {
  const theme = useTheme();
  const { itemName } = useContext(DataContext);
  const { pathname } = useLocation();
  const match = useMatch(pathname, {
    path: '/embedded/',
    exact: false,
  });

  if (match) {
    return (
      <Grid
        container
        flexGrow={1}
        justifyContent="space-between"
        alignItems="center"
        pt={1}
        pr={2}
        pl={4}
        pb={2}
      >
        <Grid item xs={3.5}>
          <ViewSelect />
        </Grid>
        <Grid item xs={3.5}>
          <UsersSelect />
        </Grid>
        <Grid item xs={3.5}>
          <ActionsSelect />
        </Grid>
        <Grid item xs={1.5}>
          <ExportData />
        </Grid>
        {/* <Grid item xs={9}>
          <ExportData />
          <ViewSelect />
          <UsersSelect />
          <ActionsSelect />
        </Grid>
        <Grid item xs={3}>
          <ReportData />
        </Grid> */}
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
            {itemName}
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
