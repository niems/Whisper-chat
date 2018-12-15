import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationContext from '../authentication/authenticationContext';
import UrlContext from '../urlContext/urlContext';

const Homepage = () => {
  return (
    <AuthenticationContext.Consumer>
      {({ isUserAuthenticated }) => (
        <UrlContext.Consumer>
          {({ basePath }) => (
            <main id="homepage" className="wrapper main">
              <header>
                <div className="row space-between">
                  <Link className="link-to" to={`${basePath}create-account`}>
                    Create Account
                  </Link>
                  {isUserAuthenticated.status ? (
                    <Link className="link-to" to={`${basePath}profile`}>
                      Profile
                    </Link>
                  ) : (
                    <Link className="link-to" to={`${basePath}login`}>
                      Login
                    </Link>
                  )}
                </div>

                <h1>Whisper chat</h1>
                <p>App description here...</p>
              </header>
            </main>
          )}
        </UrlContext.Consumer>
      )}
    </AuthenticationContext.Consumer>
  );
};

export default Homepage;
