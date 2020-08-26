import React, { useEffect, useState, useMemo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Typography, Badge } from 'antd';
import { CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { openNotificationWithIcon } from '../Notification/Notification';
import { toggleCart } from '../../store/actions/cartActions';

import { logOutUser } from '../../store/actions/authActions';
import './styles.css';

const { SubMenu } = Menu;

const Navbar = ({ auth, cartItems, logOutUser, history, toggleCart }) => {
  const [onSellersPath, setonSellersPath] = useState(false);
  const [totalCartItems, settotalCartItems] = useState(0);
  const onLogOut = () => {
    logOutUser(history);
  };

  useEffect(() => {
    setonSellersPath(window.location.pathname.includes('seller'));
  }, []);

  useEffect(() => {
    settotalCartItems(cartItems.reduce((t, i) => t + i.count, 0));
  }, [cartItems]);

  useEffect(() => {
    if (auth.error) {
      console.log(auth.error);
      openNotificationWithIcon({
        type: 'error',
        message: auth.error,
      });
    }
  }, [auth.error]);

  const homeLink = useMemo(
    () =>
      onSellersPath ? (
        <Menu.Item className="nav-item">
          <a href="/seller-dashboard">
            <Typography.Title level={4} style={{ color: '#fff' }}>
              Amazona's Seller
            </Typography.Title>
          </a>
        </Menu.Item>
      ) : (
        <Menu.Item className="nav-item">
          <a href="/">
            <Typography.Title level={4} style={{ color: '#fff' }}>
              AMAZONA
            </Typography.Title>
          </a>
        </Menu.Item>
      ),
    [onSellersPath],
  );

  const crossRoleLink = useMemo(
    () =>
      onSellersPath ? (
        <Menu.Item className="subnav-item">
          <a href="/"> Back To Amazona</a>
        </Menu.Item>
      ) : (
        <Menu.Item className="subnav-item">
          <a href="/seller-dashboard"> Seller Dashboard</a>
        </Menu.Item>
      ),
    [onSellersPath],
  );

  return (
    <Menu theme="dark" className="navbar flex-1" mode="horizontal">
      {homeLink}
      <Menu.Item className="flex-1" />
      {auth.isAuthenticated ? (
        onSellersPath ? null : (
          <Menu.Item className="nav-item" onClick={toggleCart}>
            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
            Cart &nbsp;
            <Badge
              style={{
                color: 'white',
                background: 'rgba(255, 255, 255, 0.4)',
                borderColor: 'rgba(255, 255, 255, 0.65)',
                fontSize: '16px',
              }}
              count={totalCartItems}
            />
          </Menu.Item>
        )
      ) : (
        <Menu.Item className="nav-item">
          <a href="/login">Login</a>
        </Menu.Item>
      )}
      {auth.isAuthenticated && (
        <SubMenu
          title={
            <span>
              <img className="avatar" src={auth.me.avatar} />
              <CaretDownOutlined />
            </span>
          }
        >
          {auth.me?.isSeller ? (
            crossRoleLink
          ) : (
            <Menu.Item className="subnav-item">
              <a href="/register-seller">Register as Seller</a>
            </Menu.Item>
          )}
          {auth.isAuthenticated && (
            <Menu.Item className="subnav-item" onClick={onLogOut}>
              <a href="#">Log out</a>
            </Menu.Item>
          )}
        </SubMenu>
      )}
    </Menu>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cartItems: state.cart.cartItems,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser, toggleCart }))(Navbar);
