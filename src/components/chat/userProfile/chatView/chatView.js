import React, { Component } from 'react';
import ChatInput from './chatInput/chatInput';
import ChannelMessages from './channelMessages/channelMessages';

const ChatView = ({ channelInfo, sendNewMsg }) => {    
    return (
        <main id='chat-view'>
            <div id='channel-title'>
                <h1>{`#${channelInfo.name}`}</h1>
            </div>

            <ChannelMessages messages={channelInfo.messages} />
            <ChatInput category={channelInfo.category} name={channelInfo.name} sendNewMsg={sendNewMsg} />
        </main>
    );
};

export default ChatView;