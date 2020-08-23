import axios from 'axios';
import { attachTokenToHeaders } from './authActions';
import {
  GET_SINGLE_PRODUCT_LOADING,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_LOADING,
  CREATE_PRODUCT_SUCCESS,
} from '../types';
import { uploadImage } from './imageActions';

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

export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_PRODUCT_LOADING,
  });
  try {
    const imgUrl = uploadImage(product.image);
    console.log({ ...product, image: imgUrl });
    const response = await axios.post('/api/products', { ...product, image: imgUrl });
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_PRODUCT_ERROR,
      payload: err.response.data.message,
    });
  }
};
