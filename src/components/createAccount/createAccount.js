import React from 'react';
import { Link } from 'react-router-dom';
import UrlContext from '../urlContext/urlContext';
import HomeNavigation from '../navigation/homeNavigation/homeNavigation';
import CreateAccountForm from './createAccountForm/createAccountForm';

const CreateAccount = () => {
  return (
    <UrlContext.Consumer>
      {({ basePath }) => (
        <article id="create-account" className="wrapper center">
          <HomeNavigation />
          <h1>Create Account</h1>
          <CreateAccountForm />

          <p className="related-info">
            Already have an account?{' '}
            <Link className="link-to-default" to={`${basePath}login`}>
              Login here
            </Link>
          </p>
        </article>
      )}
    </UrlContext.Consumer>
  );
};

export default CreateAccount;
