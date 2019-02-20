import {
  FETCHING_CONCERTS,
  FETCHING_CONCERTS_RESOLVED,
  FETCHING_CONCERTS_REJECTED
} from './types';

const apiKey = process.env.API_KEY || 'mQaGLmJAdbIIluEaEIvEfzTAJA18fWzQ';

export const fetchConcerts = (query) => async dispatch => {
  dispatch({
    type: FETCHING_CONCERTS
  })
  try {
    
  } catch (error) {
    
  }
}