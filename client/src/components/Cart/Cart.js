import React from 'react';
import { Button, Typography } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';

const Cart = ({ auth, cartItems, history }) => {
  const onHandleCheckout = () => {
    auth.isAuthenticated ? console.log('allow checkout') : history.push('/login');
  };
  return (
    <div
      style={{
        height: '83%',
        width: '300px',
        position: 'fixed',
        right: 16,
        top: 90,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Typography.Title level={2} style={{ marginTop: 20 }}>
        Cart
      </Typography.Title>
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
