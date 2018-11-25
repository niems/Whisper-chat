import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationContext from '../../authentication/authenticationContext';
import NotificationContext from '../../notification/notificationContext/notificationContext';
import areFieldsValid from '../../formFieldCheck/areFieldsValid';
import createAccountPost from '../../serverRequest/createAccountPost';

class CreateAccountForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            accountCreated: false, // redirects to /profile if account is created
        };

        this.onChange = this.onChange.bind(this); // the user modified one of the input fields
        this.onSubmit = this.onSubmit.bind(this); // the user submitted the form
    }

    componentWillUnmount() {
        if ( this.state.accountCreated ) { // successfully created account
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

        if ( areFieldsValid( {username: username, password: password} ) ) { // username & password fields valid
            if ( confirmPassword === password ) { // confirm password matches password

                // put up "checking username availability" display while waiting
                this.props.newNotification('Confirming new account with server...', 5000);                        
    
                createAccountPost({ username: username, password: password }) // asks the server to create a new account
                .then(res => res.json())
                .then(res => {
                    if ( res.createAccount === true ) { // account successfully created
                        this.setState({ accountCreated: true });
                    }

                    else {
                        this.props.newNotification('Failed to create new account: username taken', 5000, 'error');
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.props.newNotification('Failed to connect to server', 5000, 'error');            
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


/* used to pass in the authenticate and notification functions as props so they can be used in 
 create account's lifecycle methods */
const CreateAccountFormContext = (props) => {
    return (
        <NotificationContext.Consumer>
            { ({newNotification}) => (

                <AuthenticationContext.Consumer>
                    { ({authenticate}) => (
                        <CreateAccountForm {...props} authenticate={authenticate} newNotification={newNotification} />    
                    )}
                </AuthenticationContext.Consumer>

            )}
        </NotificationContext.Consumer>
    )
};

export default CreateAccountFormContext;