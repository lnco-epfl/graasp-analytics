import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import {
  EMBEDDED_ITEM_PATH,
  HOME_PATH,
  SHARED_ITEMS_PATH,
  buildItemPath,
} from '../config/paths';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import ShareItemPage from './pages/ShareItemPage';

const App = () => (
  <Router>
    <Routes>
      <Route path={EMBEDDED_ITEM_PATH} element={<ItemPage isEmbeded />} />
      <Route path={buildItemPath()} element={<ItemPage isEmbeded={false} />} />
      <Route path={HOME_PATH} element={<HomePage />} />
      <Route path={SHARED_ITEMS_PATH} element={<ShareItemPage />} />
    </Routes>
  </Router>
);

export default App;
