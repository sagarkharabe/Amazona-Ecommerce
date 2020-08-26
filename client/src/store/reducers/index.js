import { combineReducers } from 'redux';

import authReducer from './authReducer';
import registerReducer from './registerReducer';
import cartReducer from './cartReducer';
import productReducer from './productReducer';
import productsReducer from './productsReducer';
import sellerReducer from './sellerReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  cart: cartReducer,
  product: productReducer,
  products: productsReducer,
  seller: sellerReducer,
});
