import {
  ADD_RATING_LOADING,
  ADD_RATING_SUCCESS,
  ADD_RATING_FAIL,
  GET_USER_RATING_FOR_PRODUCT_SUCCESS,
  GET_USER_RATING_FOR_PRODUCT_LOADING,
  GET_USER_RATING_FOR_PRODUCT_FAIL,
} from '../types';
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
  } catch (err) {
    dispatch({
      type: ADD_RATING_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const getUserRatingForProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: GET_USER_RATING_FOR_PRODUCT_LOADING });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await Axios.get('/api/ratings/' + product._id, options);
    dispatch({
      type: GET_USER_RATING_FOR_PRODUCT_SUCCESS,
      payload: { rating: response.data.data },
    });
  } catch (err) {
    dispatch({
      type: GET_USER_RATING_FOR_PRODUCT_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
