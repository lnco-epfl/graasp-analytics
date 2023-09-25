import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

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

const App = (): JSX.Element => (
  <Router>
    <Routes>
      <Route path={EMBEDDED_ITEM_PATH} element={<ItemPage isEmbeded />} />
      <Route path={buildItemPath()} element={<ItemPage isEmbeded={false} />} />
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
      </Route>
    </Routes>
  </Router>
);

export default App;
