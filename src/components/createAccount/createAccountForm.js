import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationContext from '../authentication/authenticationContext';
import areFieldsValid from '../formFieldCheck/areFieldsValid';
import createAccountPost from '../serverRequest/createAccountPost';

class CreateAccountForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            accountCreated: false, //redirects to /profile if account is created
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillUnmount() {
        //update authenticate provider info here
        if ( this.state.accountCreated ) {
            console.log('updating accountCreated in App.js now...');
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

            case 'confirm-password':
                this.setState({ confirmPassword: e.target.value });
                break;

            default:
                console.log(`ID "${e.target.id}" not found - no action taken`);
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const {username, password, confirmPassword} = this.state;

        //username & password fields valid
        if ( areFieldsValid( {username: username, password: password} ) ) {

            //confirm password matches password
            if ( confirmPassword === password ) {

                //put up "checking username availability" display while waiting
                console.log('fields valid. Checking username availability');
    
                createAccountPost({ username: username, password: password })
                .then(res => res.json())
                .then(res => {
                    console.log(`response: ${JSON.stringify(res)}\n\n`);

                    if ( res.createAccount === true ) {
                        console.log('account created! Redirecting now...');
                        this.setState({ accountCreated: true });
                    }

                    else {
                        console.log('account not created...');
                    }
                })
                .catch(err => {
                    console.error(err);
                });
            }

            else {
                console.log('password & confirm password don\'t match D:');
            }
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
                    <input id='confirm-password' className='rounded-border' type='password' placeholder='confirm password' value={this.state.confirmPassword} onChange={this.onChange} required />

                    <button id='submit' type='submit' onClick={this.onSubmit}>SIGN UP</button>
                </form>

                {this.state.accountCreated ? <Redirect to='/profile' /> : null}
            </React.Fragment>
        );
    }
};

const CreateAccountFormContext = (props) => {
    return (
        <AuthenticationContext.Consumer>
            { ({authenticate}) => (
                <CreateAccountForm {...props} authenticate={authenticate} />    
            )}
        </AuthenticationContext.Consumer>
    )
};

export default CreateAccountFormContext;