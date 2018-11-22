import React from 'react';

const AuthenticationContext = React.createContext({
    isUserAuthenticated: {
        status: false,
        username: ''
    },

    authenticate: () => {},
    signout: () => {}
});

export default AuthenticationContext;
