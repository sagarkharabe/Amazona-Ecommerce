import { REGISTER_SELLER_ERROR, REGISTER_SELLER_LOADING, REGISTER_SELLER_SUCCESS } from '../types';

const initialState = {
  isLoading: false,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case REGISTER_SELLER_ERROR:
      return { ...state, isLoading: false, error: payload.error };
    case REGISTER_SELLER_LOADING:
      return { ...state, isLoading: true, error: null };
    case REGISTER_SELLER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
}
