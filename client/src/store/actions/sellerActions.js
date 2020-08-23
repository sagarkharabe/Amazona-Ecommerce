import axios from 'axios';
import { attachTokenToHeaders } from './authActions';
import { REGISTER_SELLER_ERROR, REGISTER_SELLER_LOADING, REGISTER_SELLER_SUCCESS } from '../types';

export const registerSeller = (data, history) => async (dispatch, getState) => {
  dispatch({
    type: REGISTER_SELLER_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.put('/api/users/register-seller', data, options);
    console.log(response.data)
    dispatch({
      type: REGISTER_SELLER_SUCCESS,
    });
    history.push(`/seller/${response.data.data.id}`);
  } catch (err) {
    console.log(err)
    dispatch({
      type: REGISTER_SELLER_ERROR,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
