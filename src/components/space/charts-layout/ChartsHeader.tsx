import { useContext, useState } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Badge,
  IconButton,
  Stack,
  SwipeableDrawer,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import DateRange from '@/components/common/DateRange';
import { TOGGLE_FILTERS_DRAWER_BUTTON_ID } from '@/config/selectors';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    itemData,
    dateRange,
    setDateRange,
    selectedUsers,
    selectedActionTypes,
  } = useContext(DataContext);
  const { pathname } = useLocation();
  const match = useMatch(pathname);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    // Keep the drawer open when using the Tab key to navigate between filter inputs
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenDrawer(!openDrawer);
  };

  const filtersSelected =
    (selectedUsers.length && 1) + (selectedActionTypes.length && 1) + +isMobile;

  if (match) {
    const filterButton = (
      <IconButton
        aria-label="open-filter"
        onClick={toggleDrawer}
        id={TOGGLE_FILTERS_DRAWER_BUTTON_ID}
      >
        <Badge color="primary" badgeContent={filtersSelected}>
          <FilterAltIcon />
        </Badge>
      </IconButton>
    );

    return (
      <>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={{ xs: 2, sm: 3, lg: 4 }}
          p={2}
        >
          <ViewSelect />

          {isMobile ? (
            filterButton
          ) : (
            <Stack direction="row">
              <DateRange dateRange={dateRange} setDateRange={setDateRange} />
              {filterButton}
            </Stack>
          )}
        </Stack>
        <SwipeableDrawer
          anchor={isMobile ? 'bottom' : 'right'}
          open={openDrawer}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          <Stack
            sx={{
              width: '100%',
              padding: 2,
              mt: isMobile ? 3 : 8,
              gap: 2,
              minWidth: '350px',
            }}
          >
            {isMobile && (
              <DateRange dateRange={dateRange} setDateRange={setDateRange} />
            )}
            <UsersSelect />
            <ActionsSelect />
          </Stack>
        </SwipeableDrawer>
      </>
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
