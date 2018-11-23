import React from 'react';
import AuthenticationContext from '../../../authentication/authenticationContext';

const ChannelsPanel = ({ username, signout }) => {
    return (
        <section className='side-panel'>
            <button className='link-to' onClick={signout}><small>signout</small></button>
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