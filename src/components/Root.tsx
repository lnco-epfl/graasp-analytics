import ReactGA from 'react-ga4';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline } from '@mui/material';

import { hasAcceptedCookies } from '@graasp/sdk';
import { langs } from '@graasp/translations';
import { ThemeProvider } from '@graasp/ui';

import i18next from 'i18next';

import { GA_MEASUREMENT_ID } from '../config/env';
import i18nConfig, { useCommonTranslation } from '../config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  hooks,
  queryClient,
} from '../config/queryClient';
import App from './App';

if (GA_MEASUREMENT_ID && hasAcceptedCookies() && import.meta.env.PROD) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  ReactGA.send('pageview');
}

const ThemeWrapper = () => {
  const { i18n } = useCommonTranslation();
  const { data: currentMember } = hooks.useCurrentMember();

  return (
    <ThemeProvider
      langs={langs}
      languageSelectSx={{ mb: 2, mr: 2 }}
      i18n={i18n}
      defaultDirection={i18next.dir(currentMember?.extra?.lang)}
    >
      <CssBaseline />
      <I18nextProvider i18n={i18nConfig}>
        <Router>
          <App />
        </Router>
        <ToastContainer stacked />
      </I18nextProvider>
    </ThemeProvider>
  );
};

const Root = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeWrapper />
      {import.meta.env.DEV && import.meta.env.MODE !== 'test' && (
        <ReactQueryDevtools />
      )}
    </QueryClientProvider>
  );
};

export default Root;
