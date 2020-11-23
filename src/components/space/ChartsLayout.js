import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ChartsHeader from './charts-layout/ChartsHeader';
import ChartsAlerts from './charts-layout/ChartsAlerts';
import Charts from './charts-layout/ChartsArea';
import UsersSelect from './functionality/UsersSelect';
import Loader from '../common/Loader';
import { ComposeDataContext } from '../../contexts/ComposeDataProvider';
import { LiveDataContext } from '../../contexts/LiveDataProvider';
import { COMPOSE_VIEW_STRING } from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
  },
  warning: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const ChartsLayout = ({ view }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    isLoadingComposeData,
    composeActions,
    allComposeUsers,
    composeMetadata,
    composeUsersToFilter,
    setComposeUsersToFilter,
    composeFetchingError,
  } = useContext(ComposeDataContext);
  const {
    isLoadingLiveData,
    liveActions,
    allLiveUsers,
    liveMetadata,
    liveUsersToFilter,
    setLiveUsersToFilter,
    liveFetchingError,
  } = useContext(LiveDataContext);

  let isLoading;
  let actions;
  let allUsers;
  let metadata;
  let usersToFilter;
  let setUsersToFilter;
  let error;

  if (view === COMPOSE_VIEW_STRING) {
    isLoading = isLoadingComposeData;
    actions = composeActions;
    allUsers = allComposeUsers;
    metadata = composeMetadata;
    usersToFilter = composeUsersToFilter;
    setUsersToFilter = setComposeUsersToFilter;
    error = composeFetchingError;
  } else {
    isLoading = isLoadingLiveData;
    actions = liveActions;
    allUsers = allLiveUsers;
    metadata = liveMetadata;
    usersToFilter = liveUsersToFilter;
    setUsersToFilter = setLiveUsersToFilter;
    error = liveFetchingError;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <ChartsHeader downloadButton={!error} />
      {error ? (
        <div className={classes.root}>
          <Alert severity="error" className={classes.alert}>
            {t("There was an error retrieving this space's data.", { view })}
          </Alert>
        </div>
      ) : (
        <div>
          <ChartsAlerts metadata={metadata} view={view} />
          <UsersSelect
            view={view}
            allUsers={allUsers}
            setUsersToFilter={setUsersToFilter}
          />
          <Charts
            actions={actions}
            view={view}
            allUsers={allUsers}
            usersToFilter={usersToFilter}
          />
        </div>
      )}
    </div>
  );
};

ChartsLayout.propTypes = {
  view: PropTypes.string.isRequired,
};

export default ChartsLayout;
