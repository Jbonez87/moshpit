import {
  ADDING_FAVORITES,
  ADDING_FAVORITES_RESOLVED,
  ADDING_FAVORITES_REJECTED,
  REMOVING_FAVORITES,
  REMOVING_FAVORITES_REJECTED,
  REMOVING_FAVORITES_RESOLVED,
} from '../actions/types';

const initialState = {
  favorites: {},
  loading: false,
  error: null,
};

const favoritesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADDING_FAVORITES:
    case REMOVING_FAVORITES:
      return {
        ...state,
        loading: true,
      };
    case ADDING_FAVORITES_RESOLVED:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [payload.id]: payload,
        },
        loading: false,
      };
    case REMOVING_FAVORITES_RESOLVED:
      // eslint-disable-next-line no-case-declarations
      const newFavorites = Object.assign({}, state.favorites);
      delete newFavorites[payload.id];
      return {
        ...state,
        favorites: {
          ...newFavorites,
        },
        loading: false,
      };
    case ADDING_FAVORITES_REJECTED:
    case REMOVING_FAVORITES_REJECTED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default favoritesReducer;
