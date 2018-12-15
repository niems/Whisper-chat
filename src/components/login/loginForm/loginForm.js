import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UrlContext from '../../urlContext/urlContext';
import AuthenticationContext from '../../authentication/authenticationContext';
import NotificationContext from '../../notification/notificationContext/notificationContext';
import areFieldsValid from '../../formFieldCheck/areFieldsValid';
import loginPost from '../../serverRequest/loginPost';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loginSuccessful: false // redirects to /profile if account is logged into
    };

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.focusInput = this.focusInput.bind(this);

    this.onChange = this.onChange.bind(this); // user modified one of the inputfields
    this.onSubmit = this.onSubmit.bind(this); // user submitted form
  }

  componentDidMount() {
    this.usernameRef.current.focus(); // focuses the username inputfield when the page loads
  }

  componentWillUnmount() {
    if (this.state.loginSuccessful) {
      // updates authentication context in App.js
      this.props.authenticate(this.state.username);
    }
  }

  focusInput(e) {
    console.log(`id: ${e.target.id}`);
  }

  onChange(e) {
    e.preventDefault();

    switch (e.target.id) {
    case 'username':
      this.setState({ username: e.target.value });
      break;

    case 'password':
      this.setState({ password: e.target.value });
      break;

    default:
      console.log(`ID "${e.target.id}" not found - no action taken`);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    if (areFieldsValid({ username: username, password: password })) {
      // username & password fields valid
      this.props.newNotification('Verifying account...', 5000);

      loginPost({ username: username, password: password }) // checks with server if account exists
        .then(res => res.json())
        .then(res => {
          if (res.accountExists === true) {
            // user account exists - redirecting to /profile
            this.setState({ loginSuccessful: true });
          } else {
            this.props.newNotification(
              'Invalid username and/or password...',
              5000,
              'error'
            );
          }
        })
        .catch(() => {
          this.props.newNotification(
            'Failed to connect to server',
            5000,
            'error'
          );
        });
    } else {
      console.log('invalid fields...no action taken');
    }
  }

  render() {
    return (
      <UrlContext.Consumer>
        {({ basePath }) => (
          <React.Fragment>
            <form onSubmit={this.onSubmit}>
              <input
                id="username"
                className="rounded-border"
                type="text"
                placeholder="username"
                value={this.state.username}
                onChange={this.onChange}
                ref={this.usernameRef}
                required
              />

              <input
                id="password"
                className="rounded-border"
                type="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChange}
                ref={this.passwordRef}
                required
              />

              <button id="submit" type="submit" onClick={this.onSubmit}>
                SIGN IN
              </button>
            </form>

            {this.state.loginSuccessful ? (
              <Redirect to={`${basePath}profile`} />
            ) : null}
          </React.Fragment>
        )}
      </UrlContext.Consumer>
    );
  }
}

/* used to pass in the authenticate and notification functions as props so they can be used in 
 create account's lifecycle methods */
const LoginFormContext = props => {
  return (
    <NotificationContext.Consumer>
      {({ newNotification }) => (
        <AuthenticationContext.Consumer>
          {({ authenticate }) => (
            <LoginForm
              {...props}
              authenticate={authenticate}
              newNotification={newNotification}
            />
          )}
        </AuthenticationContext.Consumer>
      )}
    </NotificationContext.Consumer>
  );
};

export default LoginFormContext;
