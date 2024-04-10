import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

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
  const { data: currentMember } = hooks.useCurrentMember();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (currentMember?.extra?.lang !== i18n.language) {
      i18n.changeLanguage(currentMember?.extra?.lang ?? 'en');
    }
  }, [currentMember]);

  return (
    <Router>
      <Routes>
        <Route path={EMBEDDED_ITEM_PATH} element={<ItemPage />} />
        <Route
          // This is a shared route that allows us to re-use the same layout for both pages
          element={
            <PageWrapper>
              <Outlet />
            </PageWrapper>
          }
        >
          <Route path={HOME_PATH} element={<HomePage />} />
          <Route path={buildItemPath()} element={<ItemPage />}>
            <Route index element={<GeneralAnalyticsPage />} />
            <Route
              path={USERS_ANALYTICS_PATH}
              element={<UsersAnalyticPage />}
            />
            <Route path={ITEMS_ANALYTICS_PATH} element={<ItemAnalyticPage />} />
            <Route path={APPS_ANALYTICS_PATH} element={<AppsAnalyticPage />} />
            <Route
              path={EXPORT_ANALYTICS_PATH}
              element={<ExportAnalyticsPage />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
