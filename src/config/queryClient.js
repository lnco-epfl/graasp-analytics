import { configureQueryClient } from '@graasp/query-client';

import { REACT_APP_API_HOST } from './env';
import notifier from './notifier';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
  API_ROUTES,
} = configureQueryClient({
  API_HOST: REACT_APP_API_HOST,
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
  useMutation,
  ReactQueryDevtools,
  API_ROUTES,
};
