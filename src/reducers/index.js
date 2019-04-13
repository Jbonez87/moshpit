import {
  combineReducers,
} from 'redux';

import eventsReducer from './eventsReducer';
import eventReducer from './eventReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  eventsReducer,
  eventReducer,
  favoritesReducer,
});

export default rootReducer;
