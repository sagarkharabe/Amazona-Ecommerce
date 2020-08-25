import { ADD_RATING_LOADING, ADD_RATING_SUCCESS, ADD_RATING_FAIL } from '../types';
import { attachTokenToHeaders } from './authActions';
import Axios from 'axios';

export const addRating = (product, data) => async (dispatch, getState) => {
  dispatch({ type: ADD_RATING_LOADING });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await Axios.post('/api/ratings/', product._id, data, options);
    dispatch({
      type: ADD_RATING_SUCCESS,
      payload: { rating: response.data.data },
    });
    window.location.reload(false);
  } catch (err) {
    dispatch({
      type: ADD_RATING_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
