import React, { PureComponent } from 'react';

class MessageItem extends PureComponent {
    render() {
        return (
            <li className='channel-msg'>
                <img className='avatar' src='../assets/svg/user-icon.svg' alt='user avatar' />
                <div className='msg-container'>
                    <div>
                        <span className='msg username'>{this.props.msg.username}</span>
                        <span className='msg timestamp'>{this.props.msg.timestamp}</span>  
                    </div>
                    <p className='msg text'>{this.props.msg.text}</p>
                </div>
    
            </li>
        );
    }
}

export default MessageItem;