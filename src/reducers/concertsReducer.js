import {
  FETCHING_CONCERTS,
  FETCHING_CONCERTS_RESOLVED,
  FETCHING_CONCERTS_REJECTED
} from '../actions/types';

const initialState = {
  concerts: {},
  isLoading: false,
  error: null
}

const concertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_CONCERTS:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case FETCHING_CONCERTS_RESOLVED:
      return {
        ...state,
        concerts: action.payload,
        isLoading: false
      }
    case FETCHING_CONCERTS_REJECTED:
      return {
        ...state,
        concerts: {},
        isLoading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

export default concertsReducer;