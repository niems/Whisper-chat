import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import env from '../../../../env';

const SigningOut = () => {
  return (
    <section className="wrapper center">
      <h1>Signing out...</h1>
    </section>
  );
};

class Signout extends PureComponent {
  constructor(props) {
    super(props);

    // once true, user's login data has been removed and they're redirected to the homepage
    this.state = { isSignoutComplete: false };
  }

  // displays "signing out" screen for two seconds before redirect
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isSignoutComplete: true });
    }, 2000);
  }

  render() {
    return this.state.isSignoutComplete ? (
      <Redirect to={env.routePath} />
    ) : (
      <SigningOut />
    );
  }
}

export default Signout;
