import React, { Component, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import UrlContext from "./components/urlContext/urlContext";
import AuthenticationContext from "./components/authentication/authenticationContext";
import { getCookie, deleteCookie } from "./components/authentication/cookies";
import Homepage from "./components/homepage/homepage";
import Notification from "./components/notification/notification";
import "./components/style/main.css";

const CreateAccount = lazy(() =>
  import("./components/createAccount/createAccount")
);
const Login = lazy(() => import("./components/login/login"));
const VerifyUserProfile = lazy(() =>
  import("./components/chat/verifyUserProfile")
);
const NoMatch = lazy(() => import("./components/noMatch"));

class App extends Component {
  /*setup cookie here, then render routes based on it
    -if cookie exists and JWT isn't expired, go to profile page 
    -if cookie exists but JWT is expired, or it doesn't exist, go to homepage */

  constructor(props) {
    super(props);

    //set state initially by getting cookie info if it exists
    const username = getCookie("username");

    this.state = {
      isUserAuthenticated: {
        status: username === undefined ? false : true,
        username: username === undefined ? "" : username
      }
    };

    // called on successful login or account creation
    this.authenticate = this.authenticate.bind(this);

    /* deletes authentication cookie and redirects to homepage 
       (only available if user is logged in)  */
    this.signout = this.signout.bind(this);
  }

  componentDidMount() {
    console.log(`basePath: ${JSON.stringify(this.props.basePath)}\n`);
  }

  authenticate(username) {
    this.setState({
      isUserAuthenticated: {
        status: true,
        username: username
      }
    });
  }

  signout() {
    deleteCookie("token");
    deleteCookie("username");

    this.setState({
      isUserAuthenticated: {
        status: false,
        username: ""
      }
    });
  }

  render() {
    return (
      <div id="app">
        <Notification>
          <AuthenticationContext.Provider
            value={{
              isUserAuthenticated: this.state.isUserAuthenticated,
              authenticate: this.authenticate,
              signout: this.signout
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path={this.props.basePath} component={Homepage} />
                <Route
                  path={`${this.props.basePath}create-account`}
                  component={CreateAccount}
                />
                <Route path={`${this.props.basePath}login`} component={Login} />
                <Route
                  path={`${this.props.basePath}profile`}
                  component={VerifyUserProfile}
                />

                <Route component={NoMatch} />
              </Switch>
            </Suspense>
          </AuthenticationContext.Provider>
        </Notification>
      </div>
    );
  }
}

function AppContext(props) {
  const production = true; // updates the url path based on if site is live
  const basePath = production ? "/whisper-chat/" : "/";

  return (
    <UrlContext.Provider
      value={{
        production: production,
        basePath: basePath
      }}
    >
      <App {...props} basePath={basePath} />
    </UrlContext.Provider>
  );
}

export default AppContext;
