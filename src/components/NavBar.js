import React from 'react';
import {
  NavLink,
  withRouter,
} from 'react-router-dom';

import routes from './routes';

const NavBar = () => (
  <nav>
    {
      routes.map((route) => {
        /*
        ** This is to account for the NotFound component which has no path
        ** and to exclude all dynamic routes
        */
        if (!route.path || route.path.includes(':')) return;
        // eslint-disable-next-line consistent-return
        return (
          <NavLink
            key={route.id}
            exact
            activeClassName="active"
            to={route.path}
          >
            {route.name}
          </NavLink>
        );
      })
    }
  </nav>
);

export default withRouter(NavBar);
