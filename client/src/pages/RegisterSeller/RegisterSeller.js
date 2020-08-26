import React, { useState } from 'react';
import requireAuth from '../../hoc/requireAuth';
import Layout from '../../layout/Layout';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { registerSeller } from '../../store/actions/sellerActions';
import { withRouter, Redirect } from 'react-router-dom';
import { Button, Typography } from 'antd';

const RegisterSeller = ({ auth, history, registerSeller }) => {
  const [storeName, setstoreName] = useState('');

  const handleSubmit = () => {
    registerSeller({ storeName }, history);
  };
  if (!auth.isAuthenticated) return <Redirect to="/" />;
  else if (auth.me.isSeller) return <Redirect to={`/seller/${auth.me.id}`} />;
  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography.Title level={2}>Seller Registration</Typography.Title>
        <Typography.Text>
          To create a seller account, please enter your business name{' '}
        </Typography.Text>
        <Typography.Text strong>Name: {auth.me.name}</Typography.Text>
        <Typography.Text strong>Username: {auth.me.username}</Typography.Text>

        <input
          style={{ width: '400px', marginTop: '10px', marginBottom: '10px' }}
          value={storeName}
          type="text"
          placeholder="Store Name"
          onChange={(e) => setstoreName(e.target.value)}
        />
        <div>
          <Button
            type={'primary'}
            size={'large'}
            type={'submit'}
            disabled={storeName === ''}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { registerSeller }),
)(requireAuth(RegisterSeller));
