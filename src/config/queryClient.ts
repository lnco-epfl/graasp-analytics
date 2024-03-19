import { configureQueryClient } from '@graasp/query-client';

import { API_HOST } from './env';
import notifier from './notifier';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  mutations,
  ReactQueryDevtools,
  axios,
} = configureQueryClient({
  API_HOST,
  enableWebsocket: true,
  defaultQueryOptions: {
    keepPreviousData: true,
    refetchOnWindowFocus: true,
  },
  notifier,
});

export {
  queryClient,
  QueryClientProvider,
  hooks,
  mutations,
  ReactQueryDevtools,
  axios,
};
