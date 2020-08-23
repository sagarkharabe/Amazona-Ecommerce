import axios from 'axios';
import { REGISTER_SELLER_ERROR, REGISTER_SELLER_LOADING, REGISTER_SELLER_SUCCESS } from '../types';

export const registerSeller = (user, history) => async (dispatch, getState) => {
  dispatch({
    type: REGISTER_SELLER_LOADING,
  });
  try {
    await axios.put('/register-seller', user);
    dispatch({
      type: REGISTER_SELLER_SUCCESS,
    });
    history.push(`/seller/${user._id}`);
  } catch (err) {
    dispatch({
      type: REGISTER_SELLER_ERROR,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
