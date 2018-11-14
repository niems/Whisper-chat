import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationContext from '../authentication/authenticationContext';
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

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillUnmount() {
        //update authenticate provider info here
        if ( this.state.loginSuccessful ) {
            console.log('updating authentication in App.js now...');
            this.props.authenticate( this.state.username );
        }
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
            console.log('fields valid. Checking if account exists...');

            loginPost( {username: username, password: password} )
            .then(res => res.json())
                .then(res => {
                    console.log(`response: ${JSON.stringify(res)}\n\n`);
                    
                    if ( res.accountExists === true ) { //user account exists - redirecting to /profile
                        console.log('account exists! Redirecting now...');
                        this.setState({ loginSuccessful: true });
                    }

                    else {
                        console.log('account does NOT exist...');
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
                    <input id='username' className='rounded-border' type='text' placeholder='username' value={this.state.username} onChange={this.onChange} required />
                    <input id='password' className='rounded-border' type='password' placeholder='password' value={this.state.password} onChange={this.onChange} required />

                    <button id='submit' type='submit' onClick={this.onSubmit}>SIGN IN</button>
                </form>

                {this.state.loginSuccessful ? <Redirect to='/profile' /> : null}
            </React.Fragment>
        );
    }
};

const LoginFormContext = (props) => {
    return (
        <AuthenticationContext.Consumer>
            { ({authenticate}) => (
                <LoginForm {...props} authenticate={authenticate} />    
            )}
        </AuthenticationContext.Consumer>
    );
};

export default LoginFormContext;