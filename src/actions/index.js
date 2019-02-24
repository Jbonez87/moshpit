import {
  FETCHING_CONCERTS,
  FETCHING_CONCERTS_RESOLVED,
  FETCHING_CONCERTS_REJECTED
} from './types';

import key from '../../config';

export const fetchConcertsByZip = query => async dispatch => {
  dispatch({
    type: FETCHING_CONCERTS
  })
  try {
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&postalCode=${query}`
    const request = await fetch(url);
    const response = await request.json();
    if (!request.ok) {
      dispatch({
        type: FETCHING_CONCERTS_REJECTED,
        payload: request.statusText
      });
    } else if (!response._embedded) {
      dispatch({
        type: FETCHING_CONCERTS_REJECTED,
        payload: 'No events found'
      })
    } else {
      dispatch({
        type: FETCHING_CONCERTS_RESOLVED,
        payload: response
      });
    }
  } catch (e) {
    dispatch({
      type: FETCHING_CONCERTS_REJECTED,
      payload: e
    });
  }
}

export const fetchConcertsByCity = query => async dispatch => {
  dispatch({
    type: FETCHING_CONCERTS
  })
  try {
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&city=${query}`
    const request = await fetch(url);
    const response = await request.json();
    if (!request.ok) {
      dispatch({
        type: FETCHING_CONCERTS_REJECTED,
        payload: request.statusText
      });
    } else if(!response._embedded) {
      dispatch({
        type: FETCHING_CONCERTS_REJECTED,
        payload: 'No events found'
      })
    } else {
      dispatch({
        type: FETCHING_CONCERTS_RESOLVED,
        payload: response
      });
    }
  } catch (e) {
    console.log(e);
    dispatch({
      type: FETCHING_CONCERTS_REJECTED,
      payload: e
    });
  }
}