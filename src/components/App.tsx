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
  EMBEDDED_ITEM_PATH,
  HOME_PATH,
  SHARED_ITEMS_PATH,
  buildItemPath,
} from '../config/paths';
import PageWrapper from './layout/PageWrapper';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import SharedItemPage from './pages/SharedItemPage';

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
          <Route path={SHARED_ITEMS_PATH} element={<SharedItemPage />} />
          <Route path={buildItemPath()} element={<ItemPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
