import {
  FETCHING_EVENT,
  FETCHING_EVENT_RESOLVED,
  FETCHING_EVENT_REJECTED,
} from '../actions/types';

const initialState = {
  event: {},
  isLoading: false,
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_EVENT:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCHING_EVENT_RESOLVED:
      return {
        ...state,
        event: action.payload,
        isLoading: false,
      };
    case FETCHING_EVENT_REJECTED:
      return {
        ...state,
        event: {},
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
