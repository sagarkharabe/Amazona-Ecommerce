import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Typography } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { openNotificationWithIcon } from '..//Notification/Notification';

import { logOutUser } from '../../store/actions/authActions';
import './styles.css';

const { SubMenu } = Menu;

const Navbar = ({ auth, logOutUser, history }) => {
  const onLogOut = () => {
    logOutUser(history);
  };

  useEffect(() => {
    if (auth.error) {
      openNotificationWithIcon({
        type: 'error',
        message: auth.error,
      });
    }
  }, [auth.error]);

  return (
    <Menu theme="dark" className="navbar flex-1" mode="horizontal">
      <Typography.Title style={{ color: '#fff', margin: '10px' }}>AMAZONA</Typography.Title>
      <Menu.Item className="nav-item">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item className="flex-1" />
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
              <a href="/seller-dashboard">Dashboard</a>
            </Menu.Item>
          ) : (
            <Menu.Item className="nav-item">
              <a href="/register-seller">Register as Seller</a>
            </Menu.Item>
          )}
        </SubMenu>
      )}
      {auth.isAuthenticated && (
        <Menu.Item className="nav-item" onClick={onLogOut}>
          <a href="#">Log out</a>
        </Menu.Item>
      )}
      {!auth.isAuthenticated && (
        <Menu.Item className="nav-item">
          <a href="/login">Login</a>
        </Menu.Item>
      )}
    </Menu>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);
