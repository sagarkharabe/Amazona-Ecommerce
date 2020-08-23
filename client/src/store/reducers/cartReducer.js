import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART_LOADING,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART_LOADING,
  REMOVE_FROM_CART_ERROR,
  REMOVE_FROM_CART_SUCCESS,
} from '../types';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  isLoading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      return { ...state, cartItems: action.payload.cartItems, isLoading: false, error: null };
    case ADD_TO_CART_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADD_TO_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case REMOVE_FROM_CART_SUCCESS:
      return { ...state, cartItems: action.payload.cartItems, isLoading: false, error: null };
    case REMOVE_FROM_CART_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case REMOVE_FROM_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
