import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  ITEM_API_ROUTE,
  ANALYTICS_PARAMETER,
  buildAnalyticsEndpoint,
  buildApiOptions,
  DEFAULT_REQUEST_SAMPLE_SIZE,
} from '../api/graasp';
import { REACT_APP_API_HOST } from '../config/env';
import {
  removeLearningAnalyticsUser,
  consolidateUsers,
  formatConsolidatedUsers,
  addValueKeyToUsers,
} from '../utils/api';
import { PLAYER_VIEW_STRING } from '../config/constants';

export const PlayerDataContext = createContext();

const PlayerDataProvider = ({ children }) => {
  const [isLoadingPlayerData, setIsLoadingPlayerData] = useState(true);
  const [playerActions, setPlayerActions] = useState([]);
  const [allPlayerUsers, setAllPlayerUsers] = useState([]);
  const [playerMetadata, setPlayerMetadata] = useState({});
  const [playerFetchingError, setPlayerFetchingError] = useState(null);
  const [playerUsersToFilter, setPlayerUsersToFilter] = useState([]);
  const { itemId } = useParams();

  useEffect(() => {
    const fetchPlayerData = async () => {
      const requestUrl = buildAnalyticsEndpoint(
        REACT_APP_API_HOST,
        ITEM_API_ROUTE,
        ANALYTICS_PARAMETER,
        itemId,
        DEFAULT_REQUEST_SAMPLE_SIZE,
        PLAYER_VIEW_STRING,
      );
      try {
        const response = await fetch(requestUrl, buildApiOptions('GET'));
        if (!response.ok) {
          throw response;
        }
        const resolvedData = await response.json();
        const consolidatedUsers = addValueKeyToUsers(
          formatConsolidatedUsers(
            consolidateUsers(removeLearningAnalyticsUser(resolvedData.users)),
          ),
        );
        setPlayerActions(resolvedData.actions);
        setAllPlayerUsers(consolidatedUsers);
        setPlayerUsersToFilter(consolidatedUsers);
        setPlayerMetadata(resolvedData.metadata);
        setIsLoadingPlayerData(false);
      } catch (err) {
        setIsLoadingPlayerData(false);
        setPlayerFetchingError(err);
      }
    };
    fetchPlayerData();
  }, [itemId]);

  const value = useMemo(
    () => ({
      isLoadingPlayerData,
      playerActions,
      allPlayerUsers,
      playerMetadata,
      playerFetchingError,
      playerUsersToFilter,
      setPlayerUsersToFilter,
    }),
    [
      isLoadingPlayerData,
      playerActions,
      allPlayerUsers,
      playerMetadata,
      playerFetchingError,
      playerUsersToFilter,
      setPlayerUsersToFilter,
    ],
  );

  return (
    <PlayerDataContext.Provider value={value}>
      {children}
    </PlayerDataContext.Provider>
  );
};

PlayerDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlayerDataProvider;
