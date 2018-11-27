import React, { Component } from 'react';
import AuthenticationContext from '../../../../../authentication/authenticationContext';

class ChatInput extends Component {
    constructor(props) {
        super(props);

        this.state = { input: '' };
        this.inputRef = React.createRef();

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    onChange(e) {
        this.setState({ input: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const isMessageValid = /\S+/; // only non-empty not-only space strings are valid

        if ( isMessageValid.test( this.state.input ) ) {
            console.log('valid input');

            // send to parent to append msg and send to server
            const msg = {
                // add channel-category attribute
                channel: this.props.channel, // channel msg is intended for
                username: this.props.username,
                text: this.state.input,
                timestamp: (new Date()).toUTCString()
            };

            this.setState({ input: '' }); // clears inputfield
            this.props.sendNewMsg(msg); // appends message & sends to server
        }

        else {
            console.log('invalid input');
        }
    }

    render() {
        return (
            <div id='chat-input-container'>
                <form id='chat-input-form' onSubmit={this.onSubmit}>
                    <input id='chat-inputfield' className='rounded-border' type='text' value={this.state.input}
                        placeholder={`Say something in ${this.props.channel}`} onChange={this.onChange} ref={this.inputRef} />

                    <img className='chat-submit' src='./assets/svg/placeholder/round-arrow.svg'
                         alt='send button' onClick={this.onSubmit} />
                </form>
                
            </div>
        );
    }
    /*
    render() {
        return (
            <div id='chat-input-container'>
                <form id='chat-input-form' onSubmit={this.onSubmit}>
                    <input id='chat-inputfield' className='rounded-border' type='text' value={this.state.input}
                        placeholder={`Say something in ${this.props.channel}`} onChange={this.onChange} ref={this.inputRef} />

                    <button className='chat-submit' type='submit' onClick={this.onSubmit}>
                        <img src='./assets/svg/placeholder/round-arrow.svg' alt='send button' />
                    </button>
                </form>
                
            </div>
        );
    }
    */
}

const ChatInputContext = (props) => {
    return (
        <AuthenticationContext.Consumer>
            { ({ isUserAuthenticated }) => (
                <ChatInput {...props} username={isUserAuthenticated.username} />
            )}
        </AuthenticationContext.Consumer>
    );
}

export default ChatInputContext;