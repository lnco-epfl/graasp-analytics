import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import { buildSignInPath, getCurrentAccountLang } from '@graasp/sdk';
import { DEFAULT_LANG } from '@graasp/translations';
import { Loader, SignedInWrapper } from '@graasp/ui';

import { GRAASP_AUTH_HOST } from '@/config/env';
import { hooks } from '@/config/queryClient';

import {
  APPS_ANALYTICS_PATH,
  EMBEDDED_ITEM_PATH,
  EXPORT_ANALYTICS_PATH,
  HOME_PATH,
  ITEMS_ANALYTICS_PATH,
  MY_ANALYTICS_PATH,
  USERS_ANALYTICS_PATH,
  buildItemPath,
} from '../config/paths';
import DataProvider from './context/DataProvider';
import ViewDataProvider from './context/ViewDataProvider';
import Navigator from './layout/Navigator';
import PageWrapper from './layout/PageWrapper';
import HomePageWrapper from './pages/HomePage';
import AppsAnalyticPage from './pages/Item/AppsAnalyticPage';
import ExportAnalyticsPage from './pages/Item/ExportAnalyticsPage';
import GeneralAnalyticsPage from './pages/Item/GeneralAnalyticsPage';
import ItemAnalyticPage from './pages/Item/ItemAnalyticPage';
import ItemPage from './pages/Item/ItemPage';
import UsersAnalyticPage from './pages/Item/UsersAnalyticPage';
import MyAnalyticsPage from './pages/MyAnalyticsPage';

const App = (): JSX.Element => {
  const { data: currentAccount, isLoading } = hooks.useCurrentMember();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = getCurrentAccountLang(currentAccount, DEFAULT_LANG);
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [currentAccount]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path={EMBEDDED_ITEM_PATH} element={<ItemPage />} />

      <Route
        element={
          <SignedInWrapper
            currentAccount={currentAccount}
            redirectionLink={buildSignInPath({
              host: GRAASP_AUTH_HOST,
              redirectionUrl: window.location.toString(),
            })}
          >
            <DataProvider>
              <PageWrapper>
                <Outlet />
              </PageWrapper>
            </DataProvider>
          </SignedInWrapper>
        }
      >
        <Route path={HOME_PATH} element={<HomePageWrapper />} />
        <Route path={MY_ANALYTICS_PATH} element={<MyAnalyticsPage />} />

        <Route
          path={buildItemPath()}
          element={
            <Box id="navigatorContainer" width="100%">
              <Navigator />
              <ViewDataProvider>
                <ItemPage />
              </ViewDataProvider>
            </Box>
          }
        >
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
