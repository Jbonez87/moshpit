import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// import {
//   loadState,
//   saveState
// } from './localStorage';
import rootReducer from '../reducers';

// const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  // persistedState,
  composeEnhancers(
    applyMiddleware(thunk, logger)
  )
);

// store.subscribe(() => saveState(store.getState()));

export default store;