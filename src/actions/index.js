import {
  FETCHING_CONCERTS,
  FETCHING_CONCERTS_RESOLVED,
  FETCHING_CONCERTS_REJECTED,
  FETCHING_CONCERT,
  FETCHING_CONCERT_RESOLVED,
  FETCHING_CONCERT_REJECTED,
  ADDING_FAVORITES,
  ADDING_FAVORITES_RESOLVED,
  ADDING_FAVORITES_REJECTED,
  REMOVING_FAVORITES,
  REMOVING_FAVORITES_RESOLVED,
  REMOVING_FAVORITES_REJECTED
} from './types';

import {
  formatEventResponse
} from '../utils';

const key = process.env.APIKEY;

export const fetchConcertsByZip = query => async dispatch => {
  dispatch({
    type: FETCHING_CONCERTS
  })
  try {
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&postalCode=${query}`;
    const request = await fetch(url);
    const response = await request.json();
    if (!request.ok) {
      dispatch({
        type: FETCHING_CONCERTS_REJECTED,
        payload: request.statusText
      });
    } else if(!query) {
      dispatch({
        type: FETCHING_CONCERTS_REJECTED,
        payload: 'Please do not leave form blank'
      })
    } else if (!response._embedded) {
      dispatch({
        type: FETCHING_CONCERTS_REJECTED,
        payload: 'No events found'
      })
    } else {
      dispatch({
        type: FETCHING_CONCERTS_RESOLVED,
        payload: formatEventResponse(response)
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
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&city=${query}`;
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
        payload: formatEventResponse(response)
      });
    }
  } catch (e) {
    dispatch({
      type: FETCHING_CONCERTS_REJECTED,
      payload: e
    });
  }
}

export const fetchConcert = id => async dispatch => {
  dispatch({
    type: FETCHING_CONCERT
  })
  try {
    const request = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&id=${id}`);
    const response = await request.json();
    if (!request.ok) {
      dispatch({
        type: FETCHING_CONCERT_REJECTED,
        payload: request.statusText
      });
    } else if(!response._embedded) {
      dispatch({
        type: FETCHING_CONCERT_REJECTED,
        payload: 'Concert not found'
      });
    } else {
      dispatch({
        type: FETCHING_CONCERT_RESOLVED,
        payload: formatEventResponse(response)
      });
    }
  } catch (e) {
    dispatch({
      type: FETCHING_CONCERT_REJECTED,
      payload: e
    });
  }
}

export const addingFavorites = concert => (dispatch, getState) => {
  dispatch({
    type: ADDING_FAVORITES
  });
  if (!concert) {
    dispatch({
      type: ADDING_FAVORITES_REJECTED,
      payload: 'Concert not found'
    });
  }
  dispatch({
    type: ADDING_FAVORITES_RESOLVED,
    payload: getState().concertsReducer.concerts.events[concert.id]
  });
}

export const removingFavorites = id => (dispatch, getState) => {
  dispatch({
    type: REMOVING_FAVORITES
  });
  if (!id) {
    dispatch({
      type: REMOVING_FAVORITES_REJECTED,
      payload: 'Concert not found'
    });
  }
  dispatch({
    type: REMOVING_FAVORITES_RESOLVED,
    payload: getState().favoritesReducer.favorites[id]
  });
}