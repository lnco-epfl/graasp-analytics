import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Home from './home/Home';
import Space from './space/Space';
import Header from './layout/Header';
import Footer from './layout/Footer';

const useStyles = makeStyles((theme) => ({
  main: {
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 64px - 64px)',
    },
  },
  '@global': {
    'html, body, #root': {
      height: '100%',
    },
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
