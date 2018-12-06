import React from 'react';
import { Link } from 'react-router-dom';
import UrlContext from '../urlContext/urlContext';
import HomeNavigation from '../navigation/homeNavigation/homeNavigation';
import LoginForm from './loginForm/loginForm';

const Login = (props) => {
    return (
        <UrlContext.Consumer>
            { ({ basePath }) => (
                <article id='login' className='wrapper center'>
                    <HomeNavigation />
                    <h1>Login</h1>
                    <LoginForm />
    
                    <p className='related-info'>
                    Think you have an account? We'll just see...<br />
                    Or create a new account <Link to={`${basePath}create-account`} className='link-to-default'>here</Link>
                    </p>
                </article>
            )}
        </UrlContext.Consumer>
    );
};

export default Login;