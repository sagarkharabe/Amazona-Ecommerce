import {
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_LOADING,
  GET_SINGLE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_LOADING,
  CREATE_PRODUCT_SUCCESS,
  ADD_COMMENT_LOADING,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  ADD_RATING_SUCCESS,
  ADD_RATING_FAIL,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_LOADING,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_LOADING,
  EDIT_PRODUCT_SUCCESS,
} from '../types';

const initialState = {
  product: {},
  userRating: {},
  isLoading: false,
  isAddingComment: false,
  error: null,
  addCommentError: null,
  isDeleted: false,
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
        isAddingComment: true,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isAddingComment: false,
        product: {
          ...state.product,
          comments: state.product.comments.unshift(payload.comment),
        },
      };
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        isAddingComment: false,
        addCommentError: payload,
      };
    case DELETE_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDeleted: true,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        product: {},
        error: payload,
      };
    case EDIT_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: payload.product,
      };
    case EDIT_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
