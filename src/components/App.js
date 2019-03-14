import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import routes from './routes';
import NavBar from './NavBar';
import Footer from './Footer';
import '../static/css/app.css';

export default class App extends Component {
  render() {
    return (
      <Router
        basename={process.env.PUBLIC_URL}
      >
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
          <Footer />
        </div>
      </Router>
    );
  }
}
