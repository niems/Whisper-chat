import React from 'react';
import CategoriesPanel from './categoriesPanel/categoriesPanel';
import ChatView from './chatView/chatView';

const DisplayUserProfile = ({ channelInfo, sendNewMsg, allChannelRefs, allChannelData, allOnlineUsers, onChannelSelect, signout }) => {
    return (
        <article id='profile'>
            <CategoriesPanel allChannelRefs={allChannelRefs} allChannelData={allChannelData}
                             allOnlineUsers={allOnlineUsers} onChannelSelect={onChannelSelect} signout={signout} />
            <ChatView channelInfo={channelInfo} sendNewMsg={sendNewMsg} />
        </article>
    );
};

export default DisplayUserProfile;