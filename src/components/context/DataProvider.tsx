import { List } from 'immutable';

import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { ItemType } from '@graasp/sdk';
import { ActionRecord, ItemRecord, MemberRecord } from '@graasp/sdk/frontend';

import { Context, DEFAULT_REQUEST_SAMPLE_SIZE } from '../../config/constants';
import { hooks } from '../../config/queryClient';
import { ViewDataContext } from './ViewDataProvider';

const defaultValue: {
  actions: List<ActionRecord>;
  allMembers: List<MemberRecord>;
  selectedUsers: List<MemberRecord>;
  setSelectedUsers: Dispatch<List<MemberRecord>>;
  selectedActions: List<ActionRecord>;
  setSelectedActions: Dispatch<List<ActionRecord>>;
  error: boolean;
  itemData?: ItemRecord;
  itemChildren: List<ItemRecord>;
  isLoading: boolean;
} = {
  actions: List(),
  allMembers: List(),
  selectedUsers: List(),
  itemChildren: List(),
  setSelectedUsers: () => {
    // do nothing
  },
  setSelectedActions: () => {
    // do nothing
  },
  selectedActions: List(),
  error: false,
  isLoading: true,
};

export const DataContext = createContext(defaultValue);

// fetch data only if enabled is true
// enabled becomes true only if the user change the view in select

type Props = {
  children: JSX.Element | JSX.Element[];
};

const DataProvider = ({ children }: Props): JSX.Element => {
  const [enabledArray, setEnabledArray] = useState({
    [Context.BUILDER]: false,
    [Context.PLAYER]: false,
    [Context.LIBRARY]: false,
    [Context.UNKNOWN]: false,
  });
  const [selectedUsers, setSelectedUsers] = useState<List<MemberRecord>>(
    List(),
  );
  const [selectedActions, setSelectedActions] = useState<List<ActionRecord>>(
    List(),
  );
  const [actions, setActions] = useState<List<ActionRecord>>(List());
  const [allMembers, setAllMembers] = useState<List<MemberRecord>>(List());
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  const {
    data: builderData,
    isError: builderIsError,
    isLoading: builderIsLoading,
  } = hooks.useActions(
    {
      itemId,
      view: Context.BUILDER,
      requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    },
    { enabled: Boolean(enabledArray[Context.BUILDER]) },
  );

  const {
    data: playerData,
    isError: playerIsError,
    isLoading: playerIsLoading,
  } = hooks.useActions(
    {
      itemId,
      view: Context.PLAYER,
      requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    },
    { enabled: Boolean(enabledArray[Context.PLAYER]) },
  );

  const {
    data: explorerData,
    isError: explorerIsError,
    isLoading: explorerIsLoading,
  } = hooks.useActions(
    {
      itemId,
      view: Context.LIBRARY,
      requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    },
    { enabled: Boolean(enabledArray[Context.LIBRARY]) },
  );

  const {
    data: unknownData,
    isError: unknownIsError,
    isLoading: unknownIsLoading,
  } = hooks.useActions(
    {
      itemId,
      view: Context.UNKNOWN,
      requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    },
    { enabled: Boolean(enabledArray[Context.UNKNOWN]) },
  );

  const {
    data: itemData,
    isError: itemIsError,
    isLoading: itemIsLoading,
  } = hooks.useItem(itemId);
  const { data: itemChildren } = hooks.useChildren(itemId, {
    enabled: itemData?.type === ItemType.FOLDER,
  });

  useEffect(() => {
    if (itemIsError) {
      setError(true);
    }
  }, [itemIsError]);

  useEffect(() => {
    if (enabledArray[Context.BUILDER]) {
      setIsLoading(builderIsLoading);
    } else if (enabledArray[Context.PLAYER]) {
      setIsLoading(playerIsLoading);
    } else if (enabledArray[Context.LIBRARY]) {
      setIsLoading(explorerIsLoading);
    } else if (enabledArray[Context.UNKNOWN]) {
      setIsLoading(unknownIsLoading);
    }
  }, [
    enabledArray,
    itemIsLoading,
    builderIsLoading,
    playerIsLoading,
    explorerIsLoading,
    unknownIsLoading,
  ]);

  useEffect(() => {
    // fetch corresponding data only when view is shown
    if (!enabledArray[view]) {
      setEnabledArray({ ...enabledArray, [view]: true });
    }
  }, [view, enabledArray]);

  useEffect(() => {
    if (
      builderData &&
      view === Context.BUILDER &&
      actions.size !== builderData?.get('actions').size
    ) {
      setActions(builderData?.get('actions') ?? List());
      setAllMembers(builderData?.get('members') ?? List());
      setError(builderIsError);
    }
  }, [builderData, view, actions, builderIsError]);

  useEffect(() => {
    if (
      playerData &&
      view === Context.PLAYER &&
      actions.size !== playerData?.get('actions').size
    ) {
      setActions(playerData?.get('actions') ?? List());
      setAllMembers(playerData?.get('members') ?? List());
      setError(playerIsError);
    }
  }, [playerData, view, actions, playerIsError]);

  useEffect(() => {
    if (
      explorerData &&
      view === Context.LIBRARY &&
      actions.size !== explorerData?.get('actions').size
    ) {
      setActions(explorerData?.get('actions') ?? List());
      setAllMembers(explorerData?.get('members') ?? List());
      setError(explorerIsError);
    }
  }, [explorerData, view, actions, explorerIsError]);

  useEffect(() => {
    if (
      unknownData &&
      view === Context.UNKNOWN &&
      actions.size !== unknownData?.get('actions').size
    ) {
      setActions(unknownData?.get('actions') ?? List());
      setAllMembers(unknownData?.get('members') ?? List());
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
      isLoading,
    }),
    [
      actions,
      allMembers,
      error,
      selectedUsers,
      selectedActions,
      itemData,
      isLoading,
      itemChildren,
    ],
  );

  return (
    <DataContext.Provider value={value}> {children} </DataContext.Provider>
  );
};

export default DataProvider;
