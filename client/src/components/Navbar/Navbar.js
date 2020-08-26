import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Typography, Badge } from 'antd';
import { CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { openNotificationWithIcon } from '..//Notification/Notification';

import { logOutUser } from '../../store/actions/authActions';
import './styles.css';

const { SubMenu } = Menu;

const Navbar = ({ auth, cartItems, logOutUser, history }) => {
  const onLogOut = () => {
    logOutUser(history);
  };

  useEffect(() => {
    if (auth.error) {
      console.log(auth.error);
      openNotificationWithIcon({
        type: 'error',
        message: auth.error,
      });
    }
  }, [auth.error]);

  return (
    <Menu theme="dark" className="navbar flex-1" mode="horizontal">
      <Menu.Item className="nav-item">
        <a href="/">
          <Typography.Title level={4} style={{ color: '#fff' }}>
            AMAZONA
          </Typography.Title>
        </a>
      </Menu.Item>
      <Menu.Item className="flex-1" />
      {auth.isAuthenticated ? (
        <Menu.Item className="nav-item">
          <a href="/cart">
            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
            Cart &nbsp;
            <Badge
              style={{
                color: 'white',
                background: 'rgba(255, 255, 255, 0.4)',
                borderColor: 'rgba(255, 255, 255, 0.65)',
                fontSize: '16px',
              }}
              count={cartItems.length}
            />
          </a>
        </Menu.Item>
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
            <Menu.Item className="subnav-item">
              <a href="/seller-dashboard"> Seller Dashboard</a>
            </Menu.Item>
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

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);
