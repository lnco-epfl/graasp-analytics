import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Home from './home/Home';
import Space from './space/Space';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ContextsWrapper from './context/ContextsWrapper';

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
            <main className={classes.embedded}>
              <ContextsWrapper>
                <Space />
              </ContextsWrapper>
            </main>
          }
        />
        <Route
          path="/items/:itemId"
          element={
            <>
              <Header />
              <main className={classes.main}>
                <ContextsWrapper>
                  <Space />
                </ContextsWrapper>
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/"
          element={
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
