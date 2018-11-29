import React, { PureComponent } from 'react';
import AuthenticationContext from '../../../../../authentication/authenticationContext';

// using pure component so if a message is received in the current channel, this component won't needlessly re-render
class ChatInput extends PureComponent {
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

            // sent to userProfile to append msg and send to server
            const msg = {
                category: this.props.channelInfo.category, // category msg is intended for
                channel: this.props.channelInfo.name,      // channel msg is intended for
                username: this.props.username,             // username of sender (current user)
                text: this.state.input,                    // msg being sent
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
        console.log('chat input re-render');
        
        return (
            <div id='chat-input-container'>
                <form id='chat-input-form' onSubmit={this.onSubmit}>
                    <input id='chat-inputfield' className='rounded-border' type='text' value={this.state.input}
                        placeholder={'Say something ' + (this.props.channelInfo.category === 'Groups' ? 'in' : 'to') + ` #${this.props.channelInfo.name}`} onChange={this.onChange} ref={this.inputRef} />

                    <img className='chat-submit' src='./assets/svg/placeholder/round-arrow.svg'
                         alt='send button' onClick={this.onSubmit} />
                </form>
                
            </div>
        );
    }
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