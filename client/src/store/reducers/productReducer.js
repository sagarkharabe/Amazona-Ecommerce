import {
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_LOADING,
  GET_SINGLE_PRODUCT_SUCCESS,
} from '../types';

const initialState = {
  product: {},
  isLoading: false,
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
    default:
      return state;
  }
}
