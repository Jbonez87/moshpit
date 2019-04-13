/* eslint-disable no-underscore-dangle */
import {
  FETCHING_EVENTS,
  FETCHING_EVENTS_RESOLVED,
  FETCHING_EVENTS_REJECTED,
  FETCHING_EVENT,
  FETCHING_EVENT_RESOLVED,
  FETCHING_EVENT_REJECTED,
  ADDING_FAVORITES,
  ADDING_FAVORITES_RESOLVED,
  ADDING_FAVORITES_REJECTED,
  REMOVING_FAVORITES,
  REMOVING_FAVORITES_RESOLVED,
  REMOVING_FAVORITES_REJECTED,
} from './types';

import {
  formatEventsResponse,
  formatEventResponse,
} from '../utils';


const baseUrl = process.env.BASEURL;
const key = process.env.APIKEY;


export const fetchEventsByZip = query => async (dispatch) => {
  dispatch({
    type: FETCHING_EVENTS,
  });
  if (!query) {
    dispatch({
      type: FETCHING_EVENTS_REJECTED,
      payload: 'Please do not leave form blank',
    });
  } else {
    try {
      const url = `${baseUrl}apikey=${key}&postalCode=${query}`;
      const request = await fetch(url);
      const response = await request.json();
      if (!request.ok) {
        dispatch({
          type: FETCHING_EVENTS_REJECTED,
          payload: request.statusText,
        });
      } else if (!response._embedded) {
        dispatch({
          type: FETCHING_EVENTS_REJECTED,
          payload: 'No events found',
        });
      } else {
        dispatch({
          type: FETCHING_EVENTS_RESOLVED,
          payload: formatEventsResponse(response),
        });
      }
    } catch (e) {
      dispatch({
        type: FETCHING_EVENTS_REJECTED,
        payload: e,
      });
    }
  }
};

export const fetchEventsByCity = query => async (dispatch) => {
  dispatch({
    type: FETCHING_EVENTS,
  });
  if (!query) {
    dispatch({
      type: FETCHING_EVENTS_REJECTED,
      payload: 'Please do not leave form blank',
    });
  } else {
    try {
      const url = `${baseUrl}apikey=${key}&city=${query}`;
      const request = await fetch(url);
      const response = await request.json();
      if (!request.ok) {
        dispatch({
          type: FETCHING_EVENTS_REJECTED,
          payload: request.statusText,
        });
      } else if (!response._embedded) {
        dispatch({
          type: FETCHING_EVENTS_REJECTED,
          payload: 'No events found',
        });
      } else {
        dispatch({
          type: FETCHING_EVENTS_RESOLVED,
          payload: formatEventsResponse(response),
        });
      }
    } catch (e) {
      dispatch({
        type: FETCHING_EVENTS_REJECTED,
        payload: e,
      });
    }
  }
};

export const fetchEvent = id => (dispatch, getState) => {
  dispatch({
    type: FETCHING_EVENT,
  });
  if (!getState().eventsReducer.events.results[id]) {
    dispatch({
      type: FETCHING_EVENT_REJECTED,
      payload: 'Event not found or no longer available',
    });
  }
  dispatch({
    type: FETCHING_EVENT_RESOLVED,
    payload: formatEventResponse(getState().eventsReducer.events.results[id]),
  });
};

export const addingFavorites = event => (dispatch, getState) => {
  dispatch({
    type: ADDING_FAVORITES,
  });
  if (!event) {
    dispatch({
      type: ADDING_FAVORITES_REJECTED,
      payload: 'Concert not found',
    });
  }
  dispatch({
    type: ADDING_FAVORITES_RESOLVED,
    payload: getState().eventsReducer.events.results[event.id],
  });
};

export const removingFavorites = id => (dispatch, getState) => {
  dispatch({
    type: REMOVING_FAVORITES,
  });
  if (!id) {
    dispatch({
      type: REMOVING_FAVORITES_REJECTED,
      payload: 'Event not found',
    });
  }
  dispatch({
    type: REMOVING_FAVORITES_RESOLVED,
    payload: getState().favoritesReducer.favorites[id],
  });
};
