import React, {Component, lazy} from 'react';
import { Redirect } from 'react-router-dom';
import verifyAccountGet from '../serverRequest/verifyAccountGet';

const UserProfile = lazy(() => import('./userProfile'));
const UserTokenInvalid = lazy(() => import('./userTokenInvalid'));


const VerifyingProfile = (props) => {
    return (
        <article className='wrapper center'>
            <h1>Verifying profile</h1>
            
            <span>Please wait...like you have a choice</span>
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

        // checks the response from checkAccountToken
        this.checkAccountVerification = this.checkAccountVerification.bind(this);

        // server couldn't verify the account
        this.failedAccountVerification = this.failedAccountVerification.bind(this);

        // redirects user to /login if verification fails
        this.failedVerificationRedirect = this.failedVerificationRedirect.bind(this);
    }

    componentDidMount() {
        this.checkAccountToken();
    }

    checkAccountToken() {
        verifyAccountGet()
        .then(res => res.json())
        .then(res => this.checkAccountVerification(res))
        .catch(err => this.failedAccountVerification(err));
    }

    checkAccountVerification(res) {
        return new Promise((resolve, reject) => {
            console.log(`server response: ${JSON.stringify(res)}\n`);
            
            const { accountVerified } = res;
        
            if ( accountVerified ) {
                this.setState({
                    accountVerified: true,
                    component: <UserProfile />
                });

                resolve();
            }
    
            else {
                reject('Account not verified');
            }
        })
    }

    failedAccountVerification(err) {
        console.error(err);

        this.setState({
            accountVerified: false,
            component: <UserTokenInvalid />
        }, this.failedVerificationRedirect());
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