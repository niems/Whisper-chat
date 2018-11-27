import React from 'react';
import CategoriesPanel from './categoriesPanel/categoriesPanel';
import ChatView from './chatView/chatView';

const DisplayUserProfile = ({ channelInfo, sendNewMsg, allChannels, channelsRef, allChannelRefs, onChannelSelect, signout }) => {
    return (
        <article id='profile'>
            <CategoriesPanel allChannels={allChannels} channelsRef={channelsRef} allChannelRefs={allChannelRefs} onChannelSelect={onChannelSelect} signout={signout} />
            <ChatView channelInfo={channelInfo} sendNewMsg={sendNewMsg} />
        </article>
    );
};

export default DisplayUserProfile;