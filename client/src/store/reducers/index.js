import { combineReducers } from 'redux';

import authReducer from './authReducer';
import registerReducer from './registerReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import messageReducer from './messageReducer';
import cartReducer from './cartReducer';
import productReducer from './productReducer';
import productsReducer from './productsReducer';
import sellerReducer from './sellerReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  message: messageReducer,
  user: userReducer,
  users: usersReducer,
  cart: cartReducer,
  product: productReducer,
  products: productsReducer,
  seller: sellerReducer,
});
