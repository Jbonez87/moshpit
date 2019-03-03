import {
  ADDING_FAVORITES,
  ADDING_FAVORITES_RESOLVED,
  ADDING_FAVORITES_REJECTED
} from '../actions/types';

const initialState = {
  favorites: {},
  loading: false,
  error: null
}

const favoriteConcertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_FAVORITES:
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
    case ADDING_FAVORITES_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

export default favoriteConcertsReducer;