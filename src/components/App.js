import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import ContextsWrapper from './context/ContextsWrapper';
import Home from './home/Home';
import Footer from './layout/Footer';
import Header from './layout/Header';
import ChartsLayout from './space/ChartsLayout';

const App = () => {
  const theme = useTheme();
  return (
    <Router>
      <Routes>
        <Route
          path="/embedded/:itemId"
          element={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <main style={{ paddingTop: theme.spacing(2) }}>
              <ContextsWrapper>
                <ChartsLayout />
              </ContextsWrapper>
            </main>
          }
        />
        <Route
          path="/items/:itemId"
          element={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <>
              <Header />
              <main style={{ flex: 1 }}>
                <ContextsWrapper>
                  <ChartsLayout />
                </ContextsWrapper>
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/"
          element={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <>
              <Header />
              <main style={{ flex: 1 }}>
                <Home />
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
