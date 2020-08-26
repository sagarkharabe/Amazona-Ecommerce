import axios from 'axios';
import { attachTokenToHeaders } from './authActions';
import {
  GET_SINGLE_PRODUCT_LOADING,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_LOADING,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_LOADING,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_LOADING,
  EDIT_PRODUCT_SUCCESS,
} from '../types';
import { uploadImage } from '../../util/uploadImage';

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

export const createProduct = (product, history) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_PRODUCT_LOADING,
  });
  try {
    let imageUrl = '';
    if (product.image[0]) {
      const response = await uploadImage(product.image[0].originFileObj);
      imageUrl = response.data.secure_url;
    }
    const options = attachTokenToHeaders(getState);
    const response = await axios.post('/api/products', { ...product, image: imageUrl }, options);
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: response.data.data,
    });
    history.push('/seller-dashboard');
  } catch (err) {
    dispatch({
      type: CREATE_PRODUCT_ERROR,
      payload: err.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_PRODUCT_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.delete(`/api/products/${id}`, options);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
    window.location.reload(false);
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const editProduct = (product, history) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_PRODUCT_LOADING,
  });
  try {
    const id = getState().product.product._id;
    let imageUrl = getState().product.product.image;
    if (product.image[0]) {
      const response = await uploadImage(product.image[0].originFileObj);
      imageUrl = response.data.secure_url;
    }
    const options = attachTokenToHeaders(getState);
    const response = await axios.put(
      `/api/products/${id}`,
      { ...product, image: imageUrl },
      options,
    );
    dispatch({
      type: EDIT_PRODUCT_SUCCESS,
      payload: response.data.data,
    });
    history.push('/seller-dashboard');
  } catch (err) {
    dispatch({
      type: EDIT_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};
