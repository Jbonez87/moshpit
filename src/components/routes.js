import uuid from 'uuid/v4';

import Home from './Home';
import Concerts from './Concerts';
import NotFound from './NotFound';

export default [{
    id: uuid(),
    path: "/",
    name: "Home",
    component: Home
  },
  {
    id: uuid(),
    path: "/concerts",
    name: "Concerts",
    component: Concerts
  },
  {
    id: uuid(),
    component: NotFound
  }
];