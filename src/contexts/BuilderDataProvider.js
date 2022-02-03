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
import { BUILDER_VIEW_STRING } from '../config/constants';

export const BuilderDataContext = createContext();

const BuilderDataProvider = ({ children }) => {
  const [itemName, setItemName] = useState(null);
  const [isLoadingBuilderData, setIsLoadingBuilderData] = useState(true);
  const [builderActions, setBuilderActions] = useState([]);
  const [allBuilderUsers, setAllBuilderUsers] = useState([]);
  const [builderMetadata, setBuilderMetadata] = useState({});
  const [builderFetchingError, setBuilderFetchingError] = useState(null);
  const [builderUsersToFilter, setBuilderUsersToFilter] = useState([]);
  const { itemId } = useParams();

  useEffect(() => {
    const fetchBuilderData = async () => {
      const requestUrl = buildAnalyticsEndpoint(
        REACT_APP_API_HOST,
        ITEM_API_ROUTE,
        ANALYTICS_PARAMETER,
        itemId,
        DEFAULT_REQUEST_SAMPLE_SIZE,
        BUILDER_VIEW_STRING,
      );
      try {
        const response = await fetch(requestUrl, buildApiOptions('GET'));
        if (!response.ok) {
          throw response;
        }
        const resolvedData = await response.json();
        const mainItemName = resolvedData.item.name;
        const consolidatedUsers = addValueKeyToUsers(
          formatConsolidatedUsers(
            consolidateUsers(removeLearningAnalyticsUser(resolvedData.users)),
          ),
        );
        setItemName(mainItemName);
        setBuilderActions(resolvedData.actions);
        setAllBuilderUsers(consolidatedUsers);
        setBuilderUsersToFilter(consolidatedUsers);
        setBuilderMetadata(resolvedData.metadata);
        setIsLoadingBuilderData(false);
      } catch (err) {
        setIsLoadingBuilderData(false);
        setBuilderFetchingError(err);
      }
    };
    fetchBuilderData();
  }, [itemId]);

  const value = {
    itemName,
    isLoadingBuilderData,
    builderActions,
    allBuilderUsers,
    builderMetadata,
    builderFetchingError,
    builderUsersToFilter,
    setBuilderUsersToFilter,
  };

  return (
    <BuilderDataContext.Provider value={value}>
      {children}
    </BuilderDataContext.Provider>
  );
};

BuilderDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BuilderDataProvider;
