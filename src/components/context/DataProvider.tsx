import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import {
  Action,
  Context,
  DiscriminatedItem,
  ItemType,
  Member,
} from '@graasp/sdk';

import { addDays, endOfDay, formatISO } from 'date-fns';

import { DateRange } from '@/config/type';

import { DEFAULT_REQUEST_SAMPLE_SIZE } from '../../config/constants';
import { hooks } from '../../config/queryClient';
import { ViewDataContext } from './ViewDataProvider';

const defaultValue: {
  actions: Action[];
  allMembers: Member[];
  selectedUsers: Member[];
  setSelectedUsers: Dispatch<Member[]>;
  selectedActionTypes: string[];
  setSelectedActionTypes: Dispatch<string[]>;
  error: boolean;
  itemData?: DiscriminatedItem;
  itemChildren?: DiscriminatedItem[];
  isLoading: boolean;
  requestedSampleSize: number;
  descendantApps: DiscriminatedItem[];
  dateRange: DateRange;
  setDateRange: (view: DateRange) => void;
} = {
  actions: [],
  allMembers: [],
  selectedUsers: [],
  itemChildren: [],
  setSelectedUsers: () => {
    // do nothing
  },
  setSelectedActionTypes: () => {
    // do nothing
  },
  selectedActionTypes: [],
  error: false,
  isLoading: true,
  requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
  descendantApps: [],
  dateRange: {
    startDate: addDays(new Date(), -30),
    endDate: new Date(),
    key: 'selection',
  },
  setDateRange: () => {
    // do nothing
  },
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
  });
  const [actions, setActions] = useState<Action[]>([]);
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Member[]>([]);
  const [selectedActionTypes, setSelectedActionTypes] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  const [dateRange, setDateRange] = useState(defaultValue.dateRange);

  // todo: have a dynamic value
  const requestedSampleSize = DEFAULT_REQUEST_SAMPLE_SIZE;
  const { data: descendants = [] } = hooks.useDescendants({
    id: itemId || '',
  });

  const {
    data: builderData,
    isError: builderIsError,
    isLoading: builderIsLoading,
  } = hooks.useActions(
    {
      itemId,
      view: Context.Builder,
      requestedSampleSize,
      startDate: formatISO(dateRange.startDate),
      endDate: formatISO(endOfDay(dateRange.endDate)),
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
      startDate: formatISO(dateRange.startDate),
      endDate: formatISO(endOfDay(dateRange.endDate)),
    },
    { enabled: Boolean(enabledArray[Context.Player]) },
  );

  const {
    data: itemData,
    isError: itemIsError,
    isLoading: itemIsLoading,
  } = hooks.useItem(itemId);
  const { data: itemChildren } = hooks.useChildren(itemId, undefined, {
    enabled: itemData?.type === ItemType.FOLDER,
  });

  const descendantApps = (
    itemData ? [itemData, ...descendants] : descendants
  )?.filter(({ type }) => type === ItemType.APP);

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
    }
  }, [enabledArray, itemIsLoading, builderIsLoading, playerIsLoading]);

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
      actions.length !== builderData?.actions?.length
    ) {
      setActions(builderData?.actions ?? []);
      setAllMembers(builderData?.members ?? []);
      setError(builderIsError);
    }
  }, [builderData, view, actions, builderIsError]);

  useEffect(() => {
    if (
      playerData &&
      view === Context.Player &&
      actions.length !== playerData?.actions?.length
    ) {
      setActions(playerData?.actions ?? []);
      setAllMembers(playerData?.members ?? []);
      setError(playerIsError);
    }
  }, [playerData, view, actions, playerIsError]);

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
      descendantApps,
      dateRange,
      setDateRange,
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
      descendantApps,
      dateRange,
    ],
  );

  return (
    <DataContext.Provider value={value}> {children} </DataContext.Provider>
  );
};

export default DataProvider;
