import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ActionsByDayChart from '../charts/ActionsByDayChart';
import ActionsMap from '../charts/ActionsMap';
import ActionsByTimeOfDayChart from '../charts/ActionsByTimeOfDayChart';
import ActionsByVerbChart from '../charts/ActionsByVerbChart';

const ChartsArea = ({ actions, view, allUsers, usersToFilter }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <ActionsByDayChart
          actions={actions}
          view={view}
          allUsers={allUsers}
          usersToFilter={usersToFilter}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <ActionsMap
          actions={actions}
          view={view}
          allUsers={allUsers}
          usersToFilter={usersToFilter}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <ActionsByTimeOfDayChart
          actions={actions}
          view={view}
          allUsers={allUsers}
          usersToFilter={usersToFilter}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <ActionsByVerbChart
          actions={actions}
          view={view}
          allUsers={allUsers}
          usersToFilter={usersToFilter}
        />
      </Grid>
    </Grid>
  );
};

ChartsArea.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  view: PropTypes.string.isRequired,
  allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  usersToFilter: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChartsArea;
