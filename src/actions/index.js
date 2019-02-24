import {
  FETCHING_CONCERTS,
  FETCHING_CONCERTS_RESOLVED,
  FETCHING_CONCERTS_REJECTED
} from './types';

import {
  massageQuery
} from '../utils';

import key from '../../config';

export const fetchConcerts = query => async dispatch => {
  dispatch({
    type: FETCHING_CONCERTS
  })
  try {
    let url = massageQuery(query, key);
    const request = await fetch(url);
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
  } catch (e) {
    dispatch({
      type: FETCHING_CONCERTS_REJECTED,
      payload: e
    });
  }
}