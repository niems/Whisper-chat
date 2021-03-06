import React, { Component, lazy } from 'react';
import { Redirect } from 'react-router-dom';
import env from '../../env';
import verifyAccountGet from '../serverRequest/verifyAccountGet';
import NotificationContext from '../notification/notificationContext/notificationContext';

const UserProfile = lazy(() => import('./userProfile/userProfile'));
const UserTokenInvalid = lazy(() =>
  import('./userTokenInvalid/userTokenInvalid')
);

const VerifyingProfile = props => {
  return (
    <article className="wrapper center">
      <h1>Verifying profile</h1>

      <span>Please wait...like you have a choice</span>
    </article>
  );
};

class VerifyUserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountVerified: null,
      component: <VerifyingProfile />
    };

    // checks if user's JWT is valid
    this.checkAccountToken = this.checkAccountToken.bind(this);

    // checks the response from checkAccountToken
    this.checkAccountVerification = this.checkAccountVerification.bind(this);

    // server couldn't verify the account
    this.failedAccountVerification = this.failedAccountVerification.bind(this);

    // redirects user to /login if verification fails
    this.failedVerificationRedirect = this.failedVerificationRedirect.bind(
      this
    );
  }

  componentDidMount() {
    this.checkAccountToken();
  }

  checkAccountToken() {
    verifyAccountGet()
      //? maybe move to verifyAccountGet() file since it's only used here...
      .then(res => {
        console.log(`response status: ${res.status}`);
        console.log(`\theaders: ${JSON.stringify(res.headers)}\n`);

        if (res.status === 404) {
          return Promise.reject('404 status - rejecteddddd');
        }

        //* attempting to pull json from response
        return res.json();
      })
      //.then(res => res.json())
      .then(res => this.checkAccountVerification(res))
      .catch(err => this.failedAccountVerification(err));
  }

  //? maybe move to verifyAccountGet() file since it's only used here...
  checkAccountVerification(res) {
    return new Promise((resolve, reject) => {
      try {
        console.log(`server response: ${JSON.stringify(res)}\n`);

        const { accountVerified } = res;

        if (accountVerified) {
          this.setState({
            accountVerified: true,
            component: <UserProfile />
          });

          this.props.newNotification('Account Verified', 3000, 'success');
          resolve();
        } else {
          reject('Account not verified');
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  failedAccountVerification(err) {
    console.error(err);

    this.setState(
      { accountVerified: false, component: <UserTokenInvalid /> },
      this.failedVerificationRedirect()
    );
  }

  failedVerificationRedirect() {
    setTimeout(() => {
      this.setState({
        component: <Redirect to={`${env.routePath}login`} />
      });
    }, 3000);
  }

  render() {
    return this.state.component;
  }
}

const VerifyUserProfileContext = props => {
  return (
    <NotificationContext.Consumer>
      {({ newNotification }) => (
        <VerifyUserProfile {...props} newNotification={newNotification} />
      )}
    </NotificationContext.Consumer>
  );
};

export default VerifyUserProfileContext;
