import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  ITEM_API_ROUTE,
  ANALYTICS_PARAMETER,
  buildAnalyticsEndpoint,
  buildApiOptions,
  DEFAULT_REQUEST_SAMPLE_SIZE,
} from '../api/graasp';
import { REACT_APP_BASE_URL } from '../config/env';
import {
  removeLearningAnalyticsUser,
  consolidateUsers,
  formatConsolidatedUsers,
  addValueKeyToUsers,
} from '../utils/api';
import { EXPLORER_VIEW_STRING } from '../config/constants';

export const ExplorerDataContext = createContext();

const ExplorerDataProvider = ({ children }) => {
  const [isLoadingExplorerData, setIsLoadingExplorerData] = useState(true);
  const [explorerActions, setExplorerActions] = useState([]);
  const [allExplorerUsers, setAllExplorerUsers] = useState([]);
  const [explorerMetadata, setExplorerMetadata] = useState({});
  const [explorerFetchingError, setExplorerFetchingError] = useState(null);
  const [explorerUsersToFilter, setExplorerUsersToFilter] = useState([]);
  const { itemId } = useParams();

  useEffect(() => {
    const fetchExplorerData = async () => {
      const requestUrl = buildAnalyticsEndpoint(
        REACT_APP_BASE_URL,
        ITEM_API_ROUTE,
        ANALYTICS_PARAMETER,
        itemId,
        DEFAULT_REQUEST_SAMPLE_SIZE,
        EXPLORER_VIEW_STRING,
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
        setExplorerActions(resolvedData.actions);
        setAllExplorerUsers(consolidatedUsers);
        setExplorerUsersToFilter(consolidatedUsers);
        setExplorerMetadata(resolvedData.metadata);
        setIsLoadingExplorerData(false);
      } catch (err) {
        setIsLoadingExplorerData(false);
        setExplorerFetchingError(err);
      }
    };
    fetchExplorerData();
  }, [itemId]);

  return (
    <ExplorerDataContext.Provider
      value={{
        isLoadingExplorerData,
        explorerActions,
        allExplorerUsers,
        explorerMetadata,
        explorerFetchingError,
        explorerUsersToFilter,
        setExplorerUsersToFilter,
      }}
    >
      {children}
    </ExplorerDataContext.Provider>
  );
};

ExplorerDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ExplorerDataProvider;
