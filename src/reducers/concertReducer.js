import {
  FETCHING_CONCERT,
  FETCHING_CONCERT_RESOLVED,
  FETCHING_CONCERT_REJECTED
} from '../actions/types';

const initialState = {
  concert: {},
  isLoading: false,
  error: null
}

const concertReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_CONCERT:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case FETCHING_CONCERT_RESOLVED:
      return {
        ...state,
        concert: action.payload,
        isLoading: false
      }
    case FETCHING_CONCERT_REJECTED:
      return {
        ...state,
        concert: {},
        isLoading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

export default concertReducer;