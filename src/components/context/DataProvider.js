import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { ViewDataContext } from './ViewDataProvider';
import { hooks } from '../../config/queryClient';
import { DEFAULT_REQUEST_SAMPLE_SIZE, Context } from '../../config/constants';

export const DataContext = createContext();

// fetch data only if enabled is true
// enabled becomes true only if the user change the view in select
const DataProvider = ({ children }) => {
  const [enabledArray, setEnabledArray] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [actions, setActions] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
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
      view: Context.EXPLORER,
      requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    },
    { enabled: Boolean(enabledArray[Context.EXPLORER]) },
  );

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
      actions.length !== builderData?.get('actions').length
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
      actions.length !== playerData?.get('actions').length
    ) {
      setActions(playerData?.get('actions'));
      setAllMembers(playerData?.get('members'));
      setError(playerIsError);
    }
  }, [playerData, view, actions, playerIsError]);

  useEffect(() => {
    if (
      explorerData &&
      view === Context.EXPLORER &&
      actions.length !== explorerData?.get('actions').length
    ) {
      setActions(explorerData?.get('actions'));
      setAllMembers(explorerData?.get('members'));
      setError(explorerIsError);
    }
  }, [explorerData, view, actions, explorerIsError]);

  const value = useMemo(
    () => ({
      actions,
      allMembers,
      selectedUsers,
      setSelectedUsers,
      error,
    }),
    [actions, allMembers, error, selectedUsers],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DataProvider;
