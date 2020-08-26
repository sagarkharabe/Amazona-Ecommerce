import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART_LOADING,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART_LOADING,
  REMOVE_FROM_CART_ERROR,
  REMOVE_FROM_CART_SUCCESS,
  TOGGLE_CART_LOADING,
  TOGGLE_CART_SUCCESS,
  TOGGLE_CART_ERROR,
} from '../types';
import { openNotificationWithIcon } from '../../components/Notification/Notification';

export const addToCart = (product) => (dispatch, getState) => {
  dispatch({ type: ADD_TO_CART_LOADING });
  try {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExists = false;
    cartItems.forEach((x) => {
      if (x._id === product._id) {
        alreadyExists = true;
        x.count++;
      }
    });
    if (!alreadyExists) {
      cartItems.push({ ...product, count: 1 });
    }
    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    openNotificationWithIcon({ type: 'success', message: 'added to cart 😎' });
  } catch (err) {
    openNotificationWithIcon({ type: 'error', message: "something's not right 😕" });
    dispatch({
      type: ADD_TO_CART_ERROR,
      payload: err.message,
    });
  }
};

export const removeOneQuantity = (product) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART_LOADING });
  try {
    const cartItems = getState()
      .cart.cartItems.map((x) =>
        x._id === product._id ? (x.count <= 1 ? false : { ...x, count: x.count - 1 }) : x,
      )
      .filter(Boolean);
    dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: { cartItems } });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    openNotificationWithIcon({ type: 'success', message: 'removed from cart 😇' });
  } catch (err) {
    openNotificationWithIcon({ type: 'error', message: "something's not right 😕" });
    dispatch({
      type: REMOVE_FROM_CART_ERROR,
      payload: err.message,
    });
  }
};

export const removeFromCart = (product) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART_LOADING });
  try {
    const cartItems = getState()
      .cart.cartItems.slice()
      .filter((x) => x._id !== product._id);
    dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: { cartItems } });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    openNotificationWithIcon({ type: 'success', message: 'removed from cart 😇' });
  } catch (err) {
    openNotificationWithIcon({ type: 'error', message: "something's not right 😕" });
    dispatch({
      type: REMOVE_FROM_CART_ERROR,
      payload: err.message,
    });
  }
};

export const toggleCart = () => (dispatch, getState) => {
  dispatch({ type: TOGGLE_CART_LOADING });
  try {
    const currentState = getState().cart.isHidden;
    dispatch({ type: TOGGLE_CART_SUCCESS, payload: !currentState });
  } catch (err) {
    dispatch({ type: TOGGLE_CART_ERROR, payload: err });
  }
};
