import React from 'react';
import { Link } from 'react-router-dom';
import env from '../../env';
import HomeNavigation from '../navigation/homeNavigation/homeNavigation';
import LoginForm from './loginForm/loginForm';

const Login = () => {
  return (
    <article id="login" className="wrapper center">
      <HomeNavigation />
      <h1>Login</h1>
      <LoginForm />

      <p className="related-info">
        {"Think you have an account? We'll just see..."}
        <br />
        Or create a new account{' '}
        <Link to={`${env.routePath}create-account`} className="link-to-default">
          here
        </Link>
      </p>
    </article>
  );
};

export default Login;
