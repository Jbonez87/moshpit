import {
  combineReducers
} from 'redux';

import concertsReducer from './concertsReducer';

const rootReducer = combineReducers({
  concertsReducer
});

export default rootReducer;