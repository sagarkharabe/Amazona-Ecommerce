import { GET_PRODUCTS_FAIL, GET_PRODUCTS_LOADING, GET_PRODUCTS_SUCCESS, GET_SELLER_PRODUCTS_SUCCESS, GET_SELLER_PRODUCTS_FAIL, GET_SELLER_PRODUCTS_LOADING } from '../types';

const initialState = {
  products: [],
  sellerProducts: {},
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
    case GET_SELLER_PRODUCTS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_SELLER_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sellerProducts: payload.products
      }
    case GET_SELLER_PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
        sellerProducts: [],
        error: payload
      }
    default:
      return state;
  }
}
