import uuid from 'uuid/v4';

import Home from './Home';
import Favorites from './Favorites';
import NotFound from './NotFound';

export default [
  {
    id: uuid(),
    path: "/",
    name: "Home",
    component: Home
  },
  {
    id: uuid(),
    path: "/favorites",
    name: "Favorites",
    component: Favorites
  },
  {
    id: uuid(),
    path: "/concerts/:id",
    component: ConcertDetail
  },
  {
    id: uuid(),
    component: NotFound
  }
];