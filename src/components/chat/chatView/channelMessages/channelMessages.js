import React, { Component } from 'react';
import MessageItem from './messageItem/messageItem';

/*
const ChannelMessages = ({ messages }) => {
    return (
        <div id='channel-messages-container' className='scrollbar'>
            <ul id='channel-messages-list'>
                { messages.map((msg, index) => (
                    <MessageItem key={index} msg={msg} />
                ))}
            </ul>
        </div>
    );
};
*/

const ChannelMessages = React.forwardRef(({messages}, ref) => (
    <div id='channel-messages-container' className='scrollbar' ref={ref}>
        <ul id='channel-messages-list'>
            { messages.map((msg, index) => (
                <MessageItem key={index} msg={msg} />
            ))}
        </ul>
    </div>
));

export default ChannelMessages;