import {
  ADDING_FAVORITE_CONCERTS,
  ADDING_FAVORITE_CONCERTS_RESOLVED,
  ADDING_FAVORITE_CONCERTS_REJECTED
} from '../actions/types';

const initialState = {
  favorites: {},
  loading: false,
  error: null
}

const favoriteConcertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_FAVORITE_CONCERTS:
      return {
        ...state,
        loading: true,
      }
    case ADDING_FAVORITE_CONCERTS_RESOLVED:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [action.payload.id]: action.payload
        },
        loading: false
      }
    case ADDING_FAVORITE_CONCERTS_REJECTED:
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