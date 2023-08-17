import { configureQueryClient } from '@graasp/query-client';

import { API_HOST } from './env';
import notifier from './notifier';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  mutations,
  ReactQueryDevtools,
} = configureQueryClient({
  API_HOST,
  enableWebsocket: true,
  defaultQueryOptions: {
    keepPreviousData: true,
    refetchOnMount: false,
    // avoid refetching when same data are closely fetched
    staleTime: 1000, // ms
    cacheTime: 1000, // ms
  },
  notifier,
});

export {
  queryClient,
  QueryClientProvider,
  hooks,
  mutations,
  ReactQueryDevtools,
};
