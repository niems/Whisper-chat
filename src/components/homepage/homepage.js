/* 
path: "/"

homepage sets the view up for login / create account on the right
 and the app description on the left
*/

import React, { lazy } from 'react';
import { Link } from 'react-router-dom';

const Homepage = (props) => {    
    return (
        <main id='homepage' className='wrapper main'>
            <header>
                <div className='row space-between'>
                    <Link className='link-to' to='/create-account'>Create Account</Link>
                    <Link className='link-to' to='/login'>Login</Link>
                </div>

                <h1>Whisper chat</h1>
                <p>App description here...</p>
            </header>
        </main>
    );
};

export default Homepage;