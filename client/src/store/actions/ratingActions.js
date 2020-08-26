import {
  ADD_RATING_LOADING,
  ADD_RATING_SUCCESS,
  ADD_RATING_FAIL,
  GET_USER_RATING_FOR_PRODUCT_SUCCESS,
  GET_USER_RATING_FOR_PRODUCT_LOADING,
  GET_USER_RATING_FOR_PRODUCT_FAIL,
  UPDATE_RATING_LOADING,
  UPDATE_RATING_SUCCESS,
  UPDATE_RATING_FAIL,
} from '../types';
import { attachTokenToHeaders } from './authActions';
import Axios from 'axios';

export const addRating = (productId, data) => async (dispatch, getState) => {
  dispatch({ type: ADD_RATING_LOADING });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await Axios.post('/api/ratings/' + productId, data, options);
    dispatch({
      type: ADD_RATING_SUCCESS,
      payload: { userRating: response.data.data },
    });
    console.log(response.data.data);
  } catch (err) {
    dispatch({
      type: ADD_RATING_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};

export const getUserRatingForProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: GET_USER_RATING_FOR_PRODUCT_LOADING });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await Axios.get('/api/ratings/' + productId, options);
    dispatch({
      type: GET_USER_RATING_FOR_PRODUCT_SUCCESS,
      payload: { userRating: response.data.data },
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const updateUserRatingForProduct = (productId, data) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_RATING_LOADING });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await Axios.put('/api/ratings/' + productId, data, options);
    dispatch({
      type: UPDATE_RATING_SUCCESS,
      payload: { userRating: response.data.data.rating, product: response.data.data.product },
    });
    console.log(response.data.data);
  } catch (err) {
    dispatch({
      type: UPDATE_RATING_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
