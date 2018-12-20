import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationContext from '../authentication/authenticationContext';
import env from '../../env';

const Homepage = () => {
  return (
    <AuthenticationContext.Consumer>
      {({ isUserAuthenticated }) => (
        <main id="homepage" className="wrapper main">
          <header>
            <div className="row space-between">
              <Link className="link-to" to={`${env.routePath}create-account`}>
                Create Account
              </Link>
              {isUserAuthenticated.status ? (
                <Link className="link-to" to={`${env.routePath}profile`}>
                  Profile
                </Link>
              ) : (
                <Link className="link-to" to={`${env.routePath}login`}>
                  Login
                </Link>
              )}
            </div>

            <h1>Whisper chat</h1>
            <p>App description here...</p>
          </header>
        </main>
      )}
    </AuthenticationContext.Consumer>
  );
};

export default Homepage;
