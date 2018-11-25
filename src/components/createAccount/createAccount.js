import React from 'react';
import { Link } from 'react-router-dom';
import HomeNavigation from '../navigation/homeNavigation/homeNavigation';
import CreateAccountForm from './createAccountForm/createAccountForm';

const CreateAccount = (props) => {
    return (
        <article id='create-account' className='wrapper center'>
            <HomeNavigation />
            <h1>Create Account</h1>
            <CreateAccountForm />

            <p className='related-info'>Already have an account? <Link className='link-to-default' to='/login'>Login here</Link></p>
        </article>
    );
};

export default CreateAccount;