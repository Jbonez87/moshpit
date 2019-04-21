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

const eventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING_EVENT:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCHING_EVENT_RESOLVED:
      return {
        ...state,
        event: payload,
        isLoading: false,
      };
    case FETCHING_EVENT_REJECTED:
      return {
        ...state,
        event: {},
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
