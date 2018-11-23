import React from 'react';
import ChannelsPanel from './channelsPanel/channelsPanel';
import ChatView from './chatView/chatView';

const DisplayUserProfile = ({ channelInfo, sendNewMsg, signout }) => {
    return (
        <article id='profile'>
            <ChannelsPanel signout={signout} />
            <ChatView channelInfo={channelInfo} sendNewMsg={sendNewMsg} />
        </article>
    );
};

export default DisplayUserProfile;