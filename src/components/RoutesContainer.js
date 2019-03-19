import React from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

import '../static/css/routes.css';

import routes from './routes';

const RoutesContainer = ({ location }) => (
  <div>
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.pathname}
        timeout={{ enter: 300, exit: 300 }}
        classNames="fade"
      >
        <section
          className="route-section"
        >
          <Switch
            location={location}
          >
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
        </section>
      </CSSTransition>
    </TransitionGroup>
  </div>
);

export default withRouter(RoutesContainer);