import { useContext } from 'react';

import { Grid } from '@mui/material';

import { AppItemType } from '@graasp/sdk';

import { DataContext } from '@/components/context/DataProvider';
import { hooks } from '@/config/queryClient';

import AppContent from './AppsContent';

const AppsAnalytics = (): JSX.Element => {
  const { data: member } = hooks.useCurrentMember();
  const { descendantApps } = useContext(DataContext);

  return (
    <Grid container spacing={2} p={2}>
      {descendantApps.map((item) => (
        <Grid item key={item.id} xs={12}>
          <AppContent item={item as AppItemType} member={member} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AppsAnalytics;
