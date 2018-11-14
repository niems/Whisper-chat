import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import verifyAccountGet from '../serverRequest/verifyAccountGet';

const UserTokenInvalid = (props) => {
    return (
        <article id='profile' className='wrapper center'>
            <h1>Failed to verify profile</h1>
            
            <span>Redirecting to login screen...</span>
        </article>
    );
};

const VerifyingProfile = (props) => {
    return (
        <article id='profile' className='wrapper center'>
            <h1>Verifying profile</h1>
            
            <span>Please wait...like you have a choice</span>
        </article>
    );
};

const UserProfile = (props) => {
    return (
        <article id='profile' className='wrapper center'>
            <h1>Profile</h1>
            
            <span>Successfully logged in :o</span>
        </article>
    );
};

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            accountVerified: null,
            component: (<VerifyingProfile />)
        }; 

        // checks if user's JWT is valid
        this.checkAccountToken = this.checkAccountToken.bind(this);

        //redirects user to /login if verification fails
        this.failedVerificationRedirect = this.failedVerificationRedirect.bind(this);
    }

    componentDidMount() {
        this.checkAccountToken();
    }

    checkAccountToken() {
        verifyAccountGet()
        .then(res => res.json())
        .then(res => {
            const { accountVerified } = res;
    
            if ( accountVerified ) {
                this.setState({
                    accountVerified: true,
                    component: <UserProfile />
                });
            }

            else {
                this.setState({
                    accountVerified: false,
                    component: <UserTokenInvalid />
                }, this.failedVerificationRedirect());
            }
        })
        .catch(err => {
            this.setState({
                accountVerified: false,
                component: <UserTokenInvalid />
            }, this.failedVerificationRedirect());
        });
    }

    failedVerificationRedirect() {
        setTimeout(() => {
            this.setState({
                component: <Redirect to='/login' /> 
            });
        }, 3000);
    }
    
    render() {
        return ( this.state.component );
    }
};


//verify token before allowing Profile component to load
//display "You're not logged in" if they attempt to navigate 
//to /profile and the verification fails

//when verifying token, need to pass token as well as username (both from cookie)
//in case user modified cookie. Once token is confirmed, it will also need to match
//the username passed, otherwise it should be rejected

//waiting message - "Verifying account info..."

export default Profile;