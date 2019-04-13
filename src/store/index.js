import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import {
  loadState,
  saveState,
} from './localStorage';
import rootReducer from '../reducers';

let middleware;
if (process.env.NODE_ENV !== 'production') {
  middleware = [
    thunk,
    logger,
  ];
} else {
  middleware = [
    thunk,
  ];
}

const persistedState = loadState();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(
    applyMiddleware(...middleware),
  ),
);

store.subscribe(() => saveState(store.getState()));

export default store;
