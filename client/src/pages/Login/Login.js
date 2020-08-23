import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

import { useFormik } from 'formik';

import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loginUserWithUsername } from '../../store/actions/authActions';
import { GOOGLE_AUTH_LINK } from '../../constants';
import { loginSchema } from './validation';
import './styles.css';

const Login = ({ auth, history, loginUserWithUsername }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginUserWithUsername(values, history);
    },
  });

  if (auth.isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="login">
      <div className="container">
        <h1>Log In</h1>
        <p>
          back to{' '}
          <Link className="bold" to="/">
            Home page
          </Link>
        </p>
        <form onSubmit={formik.handleSubmit}>
          <a className="google btn" href={GOOGLE_AUTH_LINK}>
            <i className="fa fa-google fa-fw" />
            Login with Google
          </a>
          <h2>Login with Username</h2>
          <div>
            <input
              placeholder="Username"
              name="username"
              className="text"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="error">{formik.errors.username}</p>
            ) : null}
            <input
              placeholder="Password"
              name="password"
              type="password"
              className="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : null}
          </div>
          {auth.error && <p className="error">{auth.error}</p>}
          <div>
            <button
              className="btn submit"
              disabled={auth.isLoading || !formik.isValid}
              type="submit"
            >
              Log in now
            </button>
          </div>
          <div>
            Don't have an account?{' '}
            <Link className="bold" to="/register">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(withRouter, connect(mapStateToProps, { loginUserWithUsername }))(Login);
