import { List } from 'immutable';
import PropTypes from 'prop-types';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { Context, DEFAULT_REQUEST_SAMPLE_SIZE } from '../../config/constants';
import { hooks } from '../../config/queryClient';
import { ViewDataContext } from './ViewDataProvider';

export const DataContext = createContext();

// fetch data only if enabled is true
// enabled becomes true only if the user change the view in select
const DataProvider = ({ children }) => {
  const [enabledArray, setEnabledArray] = useState({});
  const [selectedUsers, setSelectedUsers] = useState(List());
  const [selectedActions, setSelectedActions] = useState(List());
  const [actions, setActions] = useState(List());
  const [allMembers, setAllMembers] = useState(List());
  const [error, setError] = useState(false);
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  const { data: builderData, isError: builderIsError } = hooks.useActions(
    {
      itemId,
      view: Context.BUILDER,
      requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    },
    { enabled: Boolean(enabledArray[Context.BUILDER]) },
  );

  const { data: playerData, isError: playerIsError } = hooks.useActions(
    {
      itemId,
      view: Context.PLAYER,
      requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    },
    { enabled: Boolean(enabledArray[Context.PLAYER]) },
  );

  const { data: explorerData, isError: explorerIsError } = hooks.useActions(
    {
      itemId,
      view: Context.LIBRARY,
      requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    },
    { enabled: Boolean(enabledArray[Context.LIBRARY]) },
  );

  const { data: unknownData, isError: unknownIsError } = hooks.useActions(
    {
      itemId,
      view: Context.UNKNOWN,
      requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    },
    { enabled: Boolean(enabledArray[Context.UNKNOWN]) },
  );

  const { data: itemData, isError: itemIsError } = hooks.useItem(itemId);
  const { data: itemChildren } = hooks.useChildren(itemId);

  useEffect(() => {
    if (itemIsError) {
      setError(true);
    }
  }, [itemIsError]);

  useEffect(() => {
    // fetch corresponding data only when view is shown
    if (!enabledArray[view]) {
      setEnabledArray({ ...enabledArray, [view]: true });
    }
  }, [view]);

  useEffect(() => {
    if (
      builderData &&
      view === Context.BUILDER &&
      actions.size !== builderData?.get('actions').size
    ) {
      setActions(builderData?.get('actions'));
      setAllMembers(builderData?.get('members'));
      setError(builderIsError);
    }
  }, [builderData, view, actions, builderIsError]);

  useEffect(() => {
    if (
      playerData &&
      view === Context.PLAYER &&
      actions.size !== playerData?.get('actions').size
    ) {
      setActions(playerData?.get('actions'));
      setAllMembers(playerData?.get('members'));
      setError(playerIsError);
    }
  }, [playerData, view, actions, playerIsError]);

  useEffect(() => {
    if (
      explorerData &&
      view === Context.LIBRARY &&
      actions.size !== explorerData?.get('actions').size
    ) {
      setActions(explorerData?.get('actions'));
      setAllMembers(explorerData?.get('members'));
      setError(explorerIsError);
    }
  }, [explorerData, view, actions, explorerIsError]);

  useEffect(() => {
    if (
      unknownData &&
      view === Context.UNKNOWN &&
      actions.size !== unknownData?.get('actions').size
    ) {
      setActions(unknownData?.get('actions'));
      setAllMembers(unknownData?.get('members'));
      setError(unknownIsError);
    }
  }, [unknownData, view, actions, unknownIsError]);

  const value = useMemo(
    () => ({
      actions,
      allMembers,
      selectedUsers,
      setSelectedUsers,
      selectedActions,
      setSelectedActions,
      error,
      itemData,
      itemChildren,
    }),
    [actions, allMembers, error, selectedUsers, selectedActions, itemData],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DataProvider;
