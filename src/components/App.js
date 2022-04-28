import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Home from './home/Home';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ContextsWrapper from './context/ContextsWrapper';
import ChartsLayout from './space/ChartsLayout';

const useStyles = makeStyles((theme) => ({
  main: {
    flex: 1,
  },
  embedded: {
    paddingTop: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <Routes>
        <Route
          path="/embedded/:itemId"
          element={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <main className={classes.embedded}>
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
              <main className={classes.main}>
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
              <main className={classes.main}>
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
