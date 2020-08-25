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
        flex: 0.3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderLeftWidth: '1px',
        borderLeftStyle: 'solid',
        borderLeftColor: '#e5e5e5',
        padding: 10,
        minWidth: '300px',
      }}
    >
      <div style={{ position: 'sticky', top: 0, display: 'grid', placeItems: 'center' }}>
        <Typography.Title level={2}>Cart</Typography.Title>
        {cartItems.map((item) => (
          <CartItem id={item._id} />
        ))}
        <span>Total: Rs{cartItems.reduce((a, c) => a + c.price * c.count, 0)}</span>
        <br />
        <Button style={{ margin: 20 }} onClick={onHandleCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cartItems: state.cart.cartItems,
});

export default compose(withRouter, connect(mapStateToProps))(Cart);
