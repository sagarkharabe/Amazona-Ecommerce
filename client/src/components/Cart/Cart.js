import React, { useEffect } from 'react';
import { Drawer, Button, Typography } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { toggleCart } from '../../store/actions/cartActions';
import { openNotificationWithIcon } from '..//Notification/Notification';
import { withRouter } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CartItem from '../CartItem/CartItem';

const Cart = ({ auth, cart: { cartItems, isHidden, error }, toggleCart, history }) => {
  const onHandleCheckout = () => {
    auth.isAuthenticated ? console.log('allow checkout') : history.push('/login');
  };

  useEffect(() => {
    if (auth.error) {
      openNotificationWithIcon({
        type: 'error',
        message: auth.error,
      });
    }
  }, [auth.error]);

  useEffect(() => {
    if (error) {
      openNotificationWithIcon({
        type: 'error',
        message: error,
      });
    }
  }, [error]);
  return (
    <Drawer
      title={
        <Typography.Title level={3} style={{ margin: 0, textAlign: 'center' }}>
          My Cart <ShoppingCartOutlined />
        </Typography.Title>
      }
      placement="right"
      closable={true}
      onClose={toggleCart}
      visible={!isHidden}
      width="400px"
      footer={
        <>
          <Typography.Text strong style={{ margin: 20, padding: 10 }}>
            Total: ₹ {cartItems.reduce((a, c) => a + c.price * c.count, 0).toFixed(2)}
          </Typography.Text>
          <Button size="large" style={{ margin: 20 }} onClick={onHandleCheckout}>
            Checkout
          </Button>
        </>
      }
      footerStyle={{ display: 'flex', justifyContent: 'space-between' }}
    >
      {cartItems.map((item) => (
        <CartItem id={item._id} />
      ))}
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

export default compose(withRouter, connect(mapStateToProps, { toggleCart }))(Cart);
