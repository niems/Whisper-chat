import React, { Component } from 'react';
import ChatInput from './chatInput/chatInput';
import ChannelMessages from './channelMessages/channelMessages';

const ChatView = ({ channelInfo, sendNewMsg }) => {
    console.log('chat-view re-rendered');
    
    return (
        <main id='chat-view'>
            <div id='channel-title'>
                <h1>{`#${channelInfo.name}`}</h1>
            </div>

            <ChannelMessages messages={channelInfo.messages} />
            <ChatInput channelInfo={channelInfo} sendNewMsg={sendNewMsg} />
        </main>
    );
};

export default ChatView;