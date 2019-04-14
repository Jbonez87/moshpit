import uuid from 'uuid/v4';

import Home from '../Home';
import Favorites from '../Favorites';
import EventDetail from '../EventDetail';
import About from '../About';
import NotFound from '../NotFound';

export default [
  {
    id: uuid(),
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    id: uuid(),
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
  },
  {
    id: uuid(),
    path: '/events/:id',
    component: EventDetail,
  },
  {
    id: uuid(),
    path: '/about',
    name: 'About Us',
    component: About,
  },
  {
    id: uuid(),
    component: NotFound,
  }
];