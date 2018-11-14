import React from 'react';
import LoginForm from './loginForm';

const Login = (props) => {
    return (
        <article id='login' className='wrapper center'>
            <h1>Login</h1>
            <LoginForm />

            <span>Think you have an account? We'll just see...</span>
        </article>
    );
};

export default Login;