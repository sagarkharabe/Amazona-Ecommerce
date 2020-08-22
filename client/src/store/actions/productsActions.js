import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import { GET_PRODUCTS_FAIL, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_LOADING } from '../types';

export const getProducts = () => async (dispatch, getState) => {
  dispatch({
    type: GET_PRODUCTS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/products', options);
    console.log(response);
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: { products: response.data.data },
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: err.message,
    });
  }
};