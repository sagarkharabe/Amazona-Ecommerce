import React, { useState } from 'react';
import requireAuth from '../../hoc/requireAuth';
import Layout from '../../layout/Layout';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { registerSeller } from '../../store/actions/sellerActions';
import { withRouter, Redirect } from 'react-router-dom';
import { Button } from 'antd';

const RegisterSeller = ({ auth, history }) => {
  const [businessName, setBusinessName] = useState('');

  const handleSubmit = () => registerSeller({ ...auth.me, businessName }, history);

  if (!auth.isAuthenticated) return <Redirect to="/" />;
  if (auth.me?.isSeller) return <Redirect to="/seller-dashboard" />;
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
        <h1>Seller Registration</h1>
        <p>To create a seller account, please enter your business name </p>
        <p>Username: {auth.me.username}</p>
        <form onSubmit={handleSubmit}>
          <input
            style={{ width: '400px', marginVertical: '10px' }}
            value={businessName}
            type="text"
            placeholder="Business Name"
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <div>
            <Button primary type="submit" disabled={businessName === ''}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(withRouter, compose(mapStateToProps))(requireAuth(RegisterSeller));
