import {
  combineReducers
} from 'redux';

import concertsReducer from './concertsReducer';
import concertReducer from './concertReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  concertsReducer,
  concertReducer,
  favoritesReducer
});

export default rootReducer;