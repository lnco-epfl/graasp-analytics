import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Home from './home/Home';
import Space from './space/Space';
import Header from './layout/Header';
import Footer from './layout/Footer';

const useStyles = makeStyles(() => ({
  main: {
    flex: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <Header />
      <main className={classes.main}>
        <Switch>
          <Route path="/spaces/:id">
            <Space />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
