import { GET_PRODUCTS_FAIL, GET_PRODUCTS_LOADING, GET_PRODUCTS_SUCCESS } from '../types';

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_PRODUCTS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload.products,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
        products: [],
        error: payload,
      };
    default:
      return state;
  }
}
