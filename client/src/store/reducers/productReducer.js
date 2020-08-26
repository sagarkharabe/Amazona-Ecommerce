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
  GET_USER_RATING_FOR_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_LOADING,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_LOADING,
  EDIT_PRODUCT_SUCCESS,
  UPDATE_RATING_SUCCESS,
  UPDATE_RATING_FAIL,
} from '../types';
import { openNotificationWithIcon } from '../../components/Notification/Notification';

const initialState = {
  product: {},
  userRating: null,
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
      openNotificationWithIcon({ type: 'success', message: 'comment added..' });
      return {
        ...state,
        isAddingComment: false,
        product: {
          ...state.product,
          comments: [payload.comment, ...state.product.comments],
        },
      };
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        isAddingComment: false,
        addCommentError: payload.error,
      };
    case ADD_RATING_SUCCESS:
      openNotificationWithIcon({ type: 'success', message: 'rated product successfully..' });
      return {
        ...state,
        product: {
          ...state.product,
          avgRating: Number(
            state.product.avgRating
              ? (state.product.avgRating + payload.userRating.rate) / 2
              : payload.userRating.rate,
          ),
          numRatings: state.product.numRatings + 1,
        },
        userRating: payload.userRating,
      };
    case ADD_RATING_FAIL:
      openNotificationWithIcon({ type: 'error', message: 'rating failed..!' });
      return {
        ...state,
        userRating: null,
      };
    case UPDATE_RATING_SUCCESS:
      openNotificationWithIcon({ type: 'success', message: 'rating updated..!' });
      return {
        ...state,
        product: {
          ...state.product,
          avgRating: payload.product.avgRating,
        },
        userRating: { ...state.userRating, rate: payload.userRating.rate },
      };
    case UPDATE_RATING_FAIL:
      openNotificationWithIcon({ type: 'error', message: 'rating updation failed..!' });
      return {
        ...state,
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
    case GET_USER_RATING_FOR_PRODUCT_SUCCESS:
      return {
        ...state,
        userRating: payload.userRating,
      };
    default:
      return state;
  }
}
