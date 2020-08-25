import { ADD_COMMENT_LOADING, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL } from '../types';
import { attachTokenToHeaders } from './authActions';
import Axios from 'axios';

export const addComment = (product, data) => async (dispatch, getState) => {
  dispatch({ type: ADD_COMMENT_LOADING });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await Axios.post('/api/comments/' + product._id, data, options);
    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: { comment: response.data.data },
    });
  } catch (err) {
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
