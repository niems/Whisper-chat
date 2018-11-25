import React from 'react';
import AuthenticationContext from '../../../../authentication/authenticationContext';

const ChannelsPanel = ({ username, signout }) => {
    return (
        <section className='side-panel'>
            <button id='logout' className='link-to' onClick={signout}>logout</button>
        </section>
    );
}

const ChannelsPanelContext = (props) => {
    return (
        <AuthenticationContext.Consumer>
            { ({ isUserAuthenticated }) => (
                <ChannelsPanel {...props} username={isUserAuthenticated.username} />
            )}
        </AuthenticationContext.Consumer>
    );
};

export default ChannelsPanelContext;