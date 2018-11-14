import React from 'react';
import CreateAccountForm from './createAccountForm';

const CreateAccount = (props) => {
    return (
        <article id='create-account' className='wrapper center'>
            <h1>Create Account</h1>
            <CreateAccountForm />

            <span>Already have an account? Tough shit...</span>
        </article>
    );
};

export default CreateAccount;