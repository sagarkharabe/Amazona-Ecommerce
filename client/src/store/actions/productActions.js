import axios from 'axios';
import { attachTokenToHeaders } from './authActions';
import {
  GET_SINGLE_PRODUCT_LOADING,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_SUCCESS,
} from '../types';

export const getProduct = (id, history) => async (dispatch, getState) => {
  dispatch({
    type: GET_SINGLE_PRODUCT_LOADING,
  });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`/api/products/${id}`, options);
    dispatch({
      type: GET_SINGLE_PRODUCT_SUCCESS,
      payload: { product: response.data.data },
    });
  } catch (err) {
    if (err?.response.status === 404) {
      history.push('/notfound');
    }
    dispatch({
      type: GET_SINGLE_PRODUCT_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
