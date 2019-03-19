import React from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import routes from './routes';

const RoutesContainer = () => (
  <div>
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
);

export default withRouter(RoutesContainer);