import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticationContext from './components/authentication/authenticationContext';
import Homepage from './components/homepage/homepage';
import './components/style/main.css';

const CreateAccount = lazy(() => import('./components/createAccount/createAccount'));
const Login = lazy(() => import('./components/login/login'));
const Profile = lazy(() => import('./components/chat/profile'));
const NoMatch = lazy(() => import('./components/noMatch'));

class App extends Component {
  /*setup cookie here, then render routes based on it
    -if cookie exists and JWT isn't expired, go to profile page 
    -if cookie exists but JWT is expired, or it doesn't exist, go to homepage */

  constructor(props) {
    super(props);

    this.state = {
      isUserAuthenticated: {
        status: false,
        username: ''
      }
    };

    //called on successful login or account creation
    this.authenticate = this.authenticate.bind(this);
  }

  authenticate(username) {
    this.setState({
      isUserAuthenticated: {
        status: true,
        username: username
      }
    });
  }

  render() {
    return (
      <div id='app'>
        <AuthenticationContext.Provider value={{
          isUserAuthenticated: this.state.isUserAuthenticated,
          authenticate: this.authenticate
        }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route path='/create-account' component={CreateAccount} />
              <Route path='/login' component={Login} />
              <Route path='/profile' component={Profile} />

              <Route component={NoMatch} />
            </Switch>
          </Suspense>
        </AuthenticationContext.Provider>
      </div>
    );
  }
}

export default App;
