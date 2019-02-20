import uuid from 'uuid/v4';

import Home from './Home';
import NotFound from './NotFound';

export default [{
    id: uuid(),
    path: "/",
    name: "Home",
    component: Home
  },
  {
    id: uuid(),
    component: NotFound
  }
];