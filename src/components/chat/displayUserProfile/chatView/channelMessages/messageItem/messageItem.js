import React from 'react';

const MessageItem = ({ msg }) => {
    return (
        <li className='channel-msg'>
            <img className='avatar' src='./assets/svg/user-icon.svg' />
            <div className='msg-container'>
                <div>
                    <span className='msg username'>{msg.username}</span>
                    <span className='msg timestamp'><small>{msg.timestamp}</small></span>  
                </div>
                <p className='msg text'>{msg.text}</p>
            </div>

        </li>
    );
};

export default MessageItem;