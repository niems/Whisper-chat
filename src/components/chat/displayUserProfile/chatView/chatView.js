import React, { Component } from 'react';
import ChatInput from './chatInput/chatInput';
import ChannelMessages from './channelMessages/channelMessages';

const ChatView = ({ channelInfo, sendNewMsg }) => {
    return (
        <section id='chat-view'>
            <div id='channel-title'>
                <h1>{channelInfo.name}</h1>
            </div>

            <ChannelMessages messages={channelInfo.messages} />
            <ChatInput channel={channelInfo.name} sendNewMsg={sendNewMsg} />
        </section>
    );
};

export default ChatView;