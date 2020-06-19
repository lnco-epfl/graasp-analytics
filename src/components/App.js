import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Home from './home/Home';
import Space from './space/Space';
import Header from './layout/Header';
import Footer from './layout/Footer';

const useStyles = makeStyles((theme) => ({
  main: {
    flex: 1,
  },
  embedded: {
    paddingTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <Switch>
        <Route path="/embedded/:spaceId">
          <main className={classes.embedded}>
            <Space />
          </main>
        </Route>
        <Route path="/spaces/:spaceId">
          <Header />
          <main className={classes.main}>
            <Space />
          </main>
          <Footer />
        </Route>
        <Route path="/">
          <Header />
          <main className={classes.main}>
            <Home />
          </main>
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
