import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationContext from '../authentication/authenticationContext';
import NotificationContext from '../notification/notificationContext/notificationContext';
import areFieldsValid from '../formFieldCheck/areFieldsValid';
import loginPost from '../serverRequest/loginPost';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loginSuccessful: false, //redirects to /profile if account is logged into
        };

        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.focusInput = this.focusInput.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.usernameRef.current.focus();
    }

    componentWillUnmount() {
        //update authenticate provider info here
        if ( this.state.loginSuccessful ) {
            console.log('updating authentication in App.js now...');
            this.props.authenticate( this.state.username );
        }
    }

    focusInput(e) {
        console.log(`id: ${e.target.id}`);
    }

    onChange(e) {
        e.preventDefault();

        switch( e.target.id ) {
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

        //username & password fields valid
        if ( areFieldsValid( {username: username, password: password} ) ) {
            loginPost( {username: username, password: password} )
            .then(res => res.json())
                .then(res => {
                    console.log(`response: ${JSON.stringify(res)}\n\n`);
                    
                    if ( res.accountExists === true ) { //user account exists - redirecting to /profile
                        this.setState({ loginSuccessful: true });
                        this.props.newNotification('Login successful', 3000, 'success');            
                    }
                    
                    else {
                        console.log('account does NOT exist');
                        this.props.newNotification('Invalid username and/or password...', 5000, 'error');            
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }

        else {
            console.log('invalid fields...no action taken');
        }
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <input id='username' className='rounded-border' type='text' placeholder='username'
                           value={this.state.username} onChange={this.onChange} ref={this.usernameRef} required />

                    <input id='password' className='rounded-border' type='password' placeholder='password'
                           value={this.state.password} onChange={this.onChange} ref={this.passwordRef} required />

                    <button id='submit' type='submit' onClick={this.onSubmit}>SIGN IN</button>
                </form>

                {this.state.loginSuccessful ? <Redirect to='/profile' /> : null}
            </React.Fragment>
        );
    }
};

const LoginFormContext = (props) => {
    return (
        <NotificationContext.Consumer>
            { ({ newNotification }) => (

                <AuthenticationContext.Consumer>
                    { ({ authenticate }) => (
                        <LoginForm {...props} authenticate={authenticate} newNotification={newNotification} />    
                    )}
                </AuthenticationContext.Consumer>

            )}
        </NotificationContext.Consumer>
    );
};

export default LoginFormContext;