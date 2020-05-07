import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import Space from './space/Space';
import Header from './layout/Header';
import Footer from './layout/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/spaces/:id">
          <Space />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
