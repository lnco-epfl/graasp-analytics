import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  DEFAULT_API_OPTIONS,
  DEFAULT_REQUEST_SAMPLE_SIZE,
  ANALYTICS_PARAMETER,
  buildAnalyticsEndpoint,
} from '../api/graasp';
import { extractMainSpace, extractMainSpaceChildren } from '../utils/api';

export const SpaceDataContext = createContext();

const SpaceDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [spaceName, setSpaceName] = useState(null);
  const [spaceImmediateChildren, setSpaceImmediateChildren] = useState([]);
  const [spaceTree, setSpaceTree] = useState([]);
  const [actions, setActions] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [error, setError] = useState(null);
  const { spaceId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const requestUrl = buildAnalyticsEndpoint(
        baseUrl,
        ANALYTICS_PARAMETER,
        spaceId,
        DEFAULT_REQUEST_SAMPLE_SIZE,
      );
      try {
        const response = await fetch(requestUrl, DEFAULT_API_OPTIONS);
        if (!response.ok) {
          throw response;
        }
        const resolvedData = await response.json();
        setIsLoading(false);
        setSpaceName(extractMainSpace(resolvedData.spaceTree).name);
        setSpaceImmediateChildren(
          extractMainSpaceChildren(resolvedData.spaceTree),
        );
        setSpaceTree(resolvedData.spaceTree);
        setActions(resolvedData.actions);
        setMetadata(resolvedData.metadata);
      } catch (err) {
        setIsLoading(false);
        setError(err);
      }
    };
    fetchData();
  }, [spaceId]);

  return (
    <SpaceDataContext.Provider
      value={{
        isLoading,
        spaceName,
        spaceImmediateChildren,
        spaceTree,
        actions,
        metadata,
        error,
      }}
    >
      {children}
    </SpaceDataContext.Provider>
  );
};

SpaceDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SpaceDataProvider;
