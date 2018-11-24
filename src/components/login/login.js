import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './loginForm';

const Login = (props) => {
    return (
        <article id='login' className='wrapper center'>
            <h1>Login</h1>
            <LoginForm />

            <p className='related-info'>
            Think you have an account? We'll just see...<br />
            Or create a new account <Link to='/create-account' className='link-to-default'>here</Link>
            </p>
            <span></span>
        </article>
    );
};

export default Login;