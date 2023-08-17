import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { Context, ItemType } from '@graasp/sdk';
import { ActionRecord, ItemRecord, MemberRecord } from '@graasp/sdk/frontend';

import { List } from 'immutable';

import { DEFAULT_REQUEST_SAMPLE_SIZE } from '../../config/constants';
import { hooks } from '../../config/queryClient';
import { ViewDataContext } from './ViewDataProvider';

const defaultValue: {
  actions: List<ActionRecord>;
  allMembers: List<MemberRecord>;
  selectedUsers: List<MemberRecord>;
  setSelectedUsers: Dispatch<List<MemberRecord>>;
  selectedActionTypes: List<string>;
  setSelectedActionTypes: Dispatch<List<string>>;
  error: boolean;
  itemData?: ItemRecord;
  itemChildren?: List<ItemRecord>;
  isLoading: boolean;
  requestedSampleSize: number;
} = {
  actions: List(),
  allMembers: List(),
  selectedUsers: List(),
  itemChildren: List(),
  setSelectedUsers: () => {
    // do nothing
  },
  setSelectedActionTypes: () => {
    // do nothing
  },
  selectedActionTypes: List(),
  error: false,
  isLoading: true,
  requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
};

export const DataContext = createContext(defaultValue);

// fetch data only if enabled is true
// enabled becomes true only if the user change the view in select

type Props = {
  children: JSX.Element | JSX.Element[];
};

const DataProvider = ({ children }: Props): JSX.Element => {
  const [enabledArray, setEnabledArray] = useState({
    [Context.Builder]: false,
    [Context.Player]: false,
    [Context.Library]: false,
    [Context.Unknown]: false,
  });
  const [actions, setActions] = useState<List<ActionRecord>>(List());
  const [allMembers, setAllMembers] = useState<List<MemberRecord>>(List());
  const [selectedUsers, setSelectedUsers] = useState<List<MemberRecord>>(
    List(),
  );
  const [selectedActionTypes, setSelectedActionTypes] = useState<List<string>>(
    List(),
  );
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  // todo: have a dynamic value
  const requestedSampleSize = DEFAULT_REQUEST_SAMPLE_SIZE;

  const {
    data: builderData,
    isError: builderIsError,
    isLoading: builderIsLoading,
  } = hooks.useActions(
    {
      itemId,
      view: Context.Builder,
      requestedSampleSize,
    },
    { enabled: Boolean(enabledArray[Context.Builder]) },
  );

  const {
    data: playerData,
    isError: playerIsError,
    isLoading: playerIsLoading,
  } = hooks.useActions(
    {
      itemId,
      view: Context.Player,
      requestedSampleSize,
    },
    { enabled: Boolean(enabledArray[Context.Player]) },
  );

  const {
    data: explorerData,
    isError: explorerIsError,
    isLoading: explorerIsLoading,
  } = hooks.useActions(
    {
      itemId,
      view: Context.Library,
      requestedSampleSize,
    },
    { enabled: Boolean(enabledArray[Context.Library]) },
  );

  const {
    data: unknownData,
    isError: unknownIsError,
    isLoading: unknownIsLoading,
  } = hooks.useActions(
    {
      itemId,
      view: Context.Unknown,
      requestedSampleSize,
    },
    { enabled: Boolean(enabledArray[Context.Unknown]) },
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
    if (enabledArray[Context.Builder]) {
      setIsLoading(builderIsLoading);
    } else if (enabledArray[Context.Player]) {
      setIsLoading(playerIsLoading);
    } else if (enabledArray[Context.Library]) {
      setIsLoading(explorerIsLoading);
    } else if (enabledArray[Context.Unknown]) {
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!enabledArray[view]) {
      setEnabledArray({ ...enabledArray, [view]: true });
    }
  }, [view, enabledArray]);

  useEffect(() => {
    if (
      builderData &&
      view === Context.Builder &&
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
      view === Context.Player &&
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
      view === Context.Library &&
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
      view === Context.Unknown &&
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
      selectedActionTypes,
      setSelectedActionTypes,
      error,
      itemData,
      itemChildren,
      isLoading,
      requestedSampleSize,
    }),
    [
      actions,
      allMembers,
      error,
      selectedUsers,
      selectedActionTypes,
      itemData,
      isLoading,
      itemChildren,
      requestedSampleSize,
    ],
  );

  return (
    <DataContext.Provider value={value}> {children} </DataContext.Provider>
  );
};

export default DataProvider;
