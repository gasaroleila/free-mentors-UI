import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp';
import UsersPage from './components/UsersPage';
import SignIn from './components/SignIn';
import RequestsPage from './components/RequestsPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={SignIn} />
        <Route exact path="/home" component={UsersPage} />
        <Route exact path="/requests" component={RequestsPage} />
      </Switch>
    </Router>
  );
};

export default App;
