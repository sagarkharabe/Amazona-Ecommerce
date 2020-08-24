import {
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_LOADING,
  GET_SINGLE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_LOADING,
  CREATE_PRODUCT_SUCCESS,
  ADD_COMMENT_LOADING, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL,
} from '../types';

const initialState = {
  product: {},
  isLoading: false,
  isAddingComment: false,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_SINGLE_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: payload.product,
      };
    case GET_SINGLE_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        product: {},
        error: payload,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: payload.product,
      };
    case CREATE_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        product: {},
        error: payload,
      };
    case ADD_COMMENT_LOADING:
      return {
        ...state,
        isAddingComment: true
      }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isAddingComment: false,
        product: {
          ...state.product,
          comments: state.product.comments.unshift(payload.comment)
        }
      }
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        isAddingComment: false,
        addCommentError: payload
      }
    default:
      return state;
  }
}
