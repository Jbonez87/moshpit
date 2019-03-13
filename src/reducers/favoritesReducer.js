import {
  ADDING_FAVORITES,
  ADDING_FAVORITES_RESOLVED,
  ADDING_FAVORITES_REJECTED,
  REMOVING_FAVORITES,
  REMOVING_FAVORITES_REJECTED,
  REMOVING_FAVORITES_RESOLVED
} from '../actions/types';
import { __values } from 'tslib';

const initialState = {
  favorites: {},
  loading: false,
  error: null
}

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_FAVORITES:
    case REMOVING_FAVORITES:
      return {
        ...state,
        loading: true,
      }
    case ADDING_FAVORITES_RESOLVED:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [action.payload.id]: action.payload
        },
        loading: false
      }
    case REMOVING_FAVORITES_RESOLVED:
      const newFavorites = Object.assign({}, state.favorites);
      delete newFavorites[action.payload.id]
      return {
        ...state,
        favorites: {
          ...newFavorites
        },
        loading: false
      }
    case ADDING_FAVORITES_REJECTED:
    case REMOVING_FAVORITES_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

export default favoritesReducer;