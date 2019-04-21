import {
  FETCHING_EVENTS,
  FETCHING_EVENTS_RESOLVED,
  FETCHING_EVENTS_REJECTED,
} from '../actions/types';

const initialState = {
  events: {},
  isLoading: false,
  error: null,
};

const eventsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING_EVENTS:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCHING_EVENTS_RESOLVED:
      return {
        ...state,
        events: payload,
        isLoading: false,
      };
    case FETCHING_EVENTS_REJECTED:
      return {
        ...state,
        events: {},
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default eventsReducer;
