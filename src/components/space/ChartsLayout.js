import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ChartsHeader from './charts-layout/ChartsHeader';
import ChartsAlerts from './charts-layout/ChartsAlerts';
import ChartsArea from './charts-layout/ChartsArea';
import UsersSelect from './functionality/UsersSelect';
import Loader from '../common/Loader';
import { BuilderDataContext } from '../../contexts/BuilderDataProvider';
import { PlayerDataContext } from '../../contexts/PlayerDataProvider';
import { ExplorerDataContext } from '../../contexts/ExplorerDataProvider';
import {
  BUILDER_VIEW_STRING,
  PLAYER_VIEW_STRING,
} from '../../config/constants';

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
    isLoadingBuilderData,
    builderActions,
    allBuilderUsers,
    builderMetadata,
    builderUsersToFilter,
    setBuilderUsersToFilter,
    builderFetchingError,
  } = useContext(BuilderDataContext);
  const {
    isLoadingPlayerData,
    playerActions,
    allPlayerUsers,
    playerMetadata,
    playerUsersToFilter,
    setPlayerUsersToFilter,
    playerFetchingError,
  } = useContext(PlayerDataContext);
  const {
    isLoadingExplorerData,
    explorerActions,
    allExplorerUsers,
    explorerMetadata,
    explorerUsersToFilter,
    setExplorerUsersToFilter,
    explorerFetchingError,
  } = useContext(ExplorerDataContext);

  let isLoading;
  let actions;
  let allUsers;
  let metadata;
  let usersToFilter;
  let setUsersToFilter;
  let error;

  if (view === BUILDER_VIEW_STRING) {
    isLoading = isLoadingBuilderData;
    actions = builderActions;
    allUsers = allBuilderUsers;
    metadata = builderMetadata;
    usersToFilter = builderUsersToFilter;
    setUsersToFilter = setBuilderUsersToFilter;
    error = builderFetchingError;
  } else if (view === PLAYER_VIEW_STRING) {
    isLoading = isLoadingPlayerData;
    actions = playerActions;
    allUsers = allPlayerUsers;
    metadata = playerMetadata;
    usersToFilter = playerUsersToFilter;
    setUsersToFilter = setPlayerUsersToFilter;
    error = playerFetchingError;
  } else {
    isLoading = isLoadingExplorerData;
    actions = explorerActions;
    allUsers = allExplorerUsers;
    metadata = explorerMetadata;
    usersToFilter = explorerUsersToFilter;
    setUsersToFilter = setExplorerUsersToFilter;
    error = explorerFetchingError;
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
          <ChartsArea
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
