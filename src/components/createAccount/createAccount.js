import React from 'react';
import CreateAccountForm from './createAccountForm';
import { Link } from 'react-router-dom';

const CreateAccount = (props) => {
    return (
        <article id='create-account' className='wrapper center'>
            <h1>Create Account</h1>
            <CreateAccountForm />

            <span>Already have an account? <Link className='link-to-default' to='/login'>Login here</Link></span>
        </article>
    );
};

export default CreateAccount;