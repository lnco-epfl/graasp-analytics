import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import { saveUrlForRedirection } from '@graasp/sdk';
import { Loader, withAuthorization } from '@graasp/ui';

import { DOMAIN } from '@/config/env';
import { SIGN_IN_PATH } from '@/config/externalPaths';
import { hooks } from '@/config/queryClient';

import {
  APPS_ANALYTICS_PATH,
  EMBEDDED_ITEM_PATH,
  EXPORT_ANALYTICS_PATH,
  HOME_PATH,
  ITEMS_ANALYTICS_PATH,
  USERS_ANALYTICS_PATH,
  buildItemPath,
} from '../config/paths';
import PageWrapper from './layout/PageWrapper';
import HomePage from './pages/HomePage';
import AppsAnalyticPage from './pages/Item/AppsAnalyticPage';
import ExportAnalyticsPage from './pages/Item/ExportAnalyticsPage';
import GeneralAnalyticsPage from './pages/Item/GeneralAnalyticsPage';
import ItemAnalyticPage from './pages/Item/ItemAnalyticPage';
import ItemPage from './pages/Item/ItemPage';
import UsersAnalyticPage from './pages/Item/UsersAnalyticPage';

const App = (): JSX.Element => {
  const { data: currentMember, isLoading } = hooks.useCurrentMember();
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    if (currentMember?.extra?.lang !== i18n.language) {
      i18n.changeLanguage(currentMember?.extra?.lang ?? 'en');
    }
  }, [currentMember]);

  if (isLoading) {
    return <Loader />;
  }

  const withAuthorizationProps = {
    currentMember,
    redirectionLink: SIGN_IN_PATH,
    onRedirect: () => {
      // save current url for later redirection after sign in
      saveUrlForRedirection(pathname, DOMAIN);
    },
  };
  const PageWrapperWithAuth = withAuthorization(
    PageWrapper,
    withAuthorizationProps,
  );

  return (
    <Routes>
      <Route path={EMBEDDED_ITEM_PATH} element={<ItemPage />} />
      <Route
        // This is a shared route that allows us to re-use the same layout for both pages
        element={
          <PageWrapperWithAuth>
            <Outlet />
          </PageWrapperWithAuth>
        }
      >
        <Route path={HOME_PATH} element={<HomePage />} />
        <Route path={buildItemPath()} element={<ItemPage />}>
          <Route index element={<GeneralAnalyticsPage />} />
          <Route path={USERS_ANALYTICS_PATH} element={<UsersAnalyticPage />} />
          <Route path={ITEMS_ANALYTICS_PATH} element={<ItemAnalyticPage />} />
          <Route path={APPS_ANALYTICS_PATH} element={<AppsAnalyticPage />} />
          <Route
            path={EXPORT_ANALYTICS_PATH}
            element={<ExportAnalyticsPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
