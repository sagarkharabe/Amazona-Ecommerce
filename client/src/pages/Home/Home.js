import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Layout from '../../layout/Layout';

import './styles.css';

const Home = ({ auth }) => {
  return (
    <Layout>
      <div className="home-page">
        <h1>Amazona E-Commerce</h1>
        <h2>Buy from sellers across the globe!</h2>
        {!auth.isAuthenticated ? (
          <div>
            <p>
              Welcome guest!{' '}
              <Link className="bold" to="/login">
                Log in
              </Link>{' '}
              or{' '}
              <Link className="bold" to="/register">
                Register
              </Link>
            </p>
          </div>
        ) : (
            <>
              <p>
                Welcome <span className="name">{auth.me.name}</span>!
            </p>
            </>
          )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps))(Home);
