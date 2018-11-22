/* 
path: "/"

homepage sets the view up for login / create account on the right
 and the app description on the left
*/

import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationContext from '../authentication/authenticationContext';

const Homepage = (props) => {    
    return (
        <AuthenticationContext.Consumer>
            { ({ isUserAuthenticated }) => (
                <main id='homepage' className='wrapper main'>
                    <header>
                        <div className='row space-between'>
                            <Link className='link-to' to='/create-account'>Create Account</Link>
                            { isUserAuthenticated.status ? 
                              <Link className='link-to' to='/profile'>Profile</Link> :
                              <Link className='link-to' to='/login'>Login</Link>
                            }
                        </div>

                        <h1>Whisper chat</h1>
                        <p>App description here...</p>
                    </header>
                </main>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default Homepage;