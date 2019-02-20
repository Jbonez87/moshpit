import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import routes from './routes';
import NavBar from './NavBar';
import '../static/css/app.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            {routes.map(route => 
            (
              <Route
                exact
                key={route.id} 
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </div>
      </Router>
    );
  }
}
