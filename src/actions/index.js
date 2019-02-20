import {
  FETCHING_CONCERTS,
  FETCHING_CONCERTS_RESOLVED,
  FETCHING_CONCERTS_REJECTED
} from './types';

const key = process.env.API_KEY || 'mQaGLmJAdbIIluEaEIvEfzTAJA18fWzQ';

export const fetchConcerts = (query) => async dispatch => {
  dispatch({
    type: FETCHING_CONCERTS
  })
  try {
    const request = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&zip=${query}`);
    const response = await request.json();
    if (!request.ok) {
      dispatch({
        type: FETCHING_CONCERTS_REJECTED,
        payload: request.statusText
      });
    } else {
      dispatch({
        type: FETCHING_CONCERTS_RESOLVED,
        payload: response
      });
    }
  } catch (error) {
    dispatch({
      type: FETCHING_CONCERTS_REJECTED,
      payload: e
    });
  }
}