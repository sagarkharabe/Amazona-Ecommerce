import React from 'react';
import { Button } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';

const Cart = ({ auth, cartItems, history }) => {
  const onHandleCheckout = () => {
    auth.isAuthenticated ? console.log('allow checkout') : history.push('/login');
  };
  console.log(cartItems);
  return (
    <div
      style={{
        height: '90%',
        width: '20%',
        position: 'fixed',
        right: 0,
        top: 90,
        borderWidth: '5px',
        borderColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      Cart
      {cartItems.map((item) => (
        <CartItem id={item._id} />
      ))}
      <span>Total: Rs{cartItems.reduce((a, c) => a + c.price * c.count, 0)}</span>
      <Button style={{ margin: 20 }} onClick={onHandleCheckout}>
        Checkout
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cartItems: state.cart.cartItems,
});

export default compose(withRouter, connect(mapStateToProps))(Cart);
