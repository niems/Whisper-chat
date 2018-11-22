import React, { Component } from 'react';
import ChatInput from './chatInput/chatInput';
import ChannelMessages from './channelMessages/channelMessages';

class ChatView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            messages: [ // holds the messages for the current channel
                {
                    username: 'Rick',
                    text: 'Wubba lubba dub dub! Here is more text to see how the wrapping works (if it does at all) Wubba lubba dub dub! Here is more text to see how the wrapping works (if it does at all)',
                    timestamp: (new Date()).toUTCString()
                }
            ]
        }; 

        // appends new message to the message list
        this.addNewMessage = this.addNewMessage.bind(this); 

        // used to scroll new messages into view
        this.scrollbarRef = React.createRef(); 
    }

    componentWillUnmount() {
        // send current messages to userProfile so they're updated 
    }

    addNewMessage(msg) {
        let messages = this.state.messages;
        messages.push(msg);

        this.setState({ messages }, () => {
            // scroll to bottom of message view
            this.scrollbarRef.current.scrollTop = this.scrollbarRef.current.scrollHeight;
        });
    }

    render() {
        return (
            <section id='chat-view'>
                <div id='channel-title'>
                    <h1>{this.props.channel}</h1>
                </div>
    
                <ChannelMessages messages={this.state.messages} ref={this.scrollbarRef} />
                <ChatInput channel={this.props.channel} addMsg={this.addNewMessage} />
            </section>
        );
    }
};

export default ChatView;