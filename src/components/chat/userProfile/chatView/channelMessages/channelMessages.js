import React, { Component } from 'react';
import MessageItem from './messageItem/messageItem';

class ChannelMessages extends Component {
    constructor(props) {
        super(props);

        // used to scroll to the bottom of the message view when a new message is added
        this.scrollbarRef = React.createRef(); 
    }

    componentDidUpdate() {
        // scroll to bottom of message view
        this.scrollbarRef.current.scrollTop = this.scrollbarRef.current.scrollHeight;
    }

    render() {
        return(
            <div id='channel-messages-container' className='scrollbar' ref={this.scrollbarRef}>
                <ul id='channel-messages-list'>
                    { this.props.messages.map((msg, index) => (
                        <MessageItem key={index} msg={msg} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default ChannelMessages;