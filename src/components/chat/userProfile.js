import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import AuthenticationContext from '../authentication/authenticationContext';
import DisplayUserProfile from './displayUserProfile/displayUserProfile';

const SigningOut = (props) => {
    return (
        <section className='wrapper center'>
            <h1>Signing out...</h1>
        </section>
    );
};


class UserProfile extends Component {
    constructor(props) {
        super(props);

        // stores messages from all the channels
        this.allMessages = {
            "#general": [ // default channel
                { // test message
                    username: 'Rick',
                    text: 'Wubba lubba dub dub! ',
                    timestamp: (new Date()).toUTCString()
                }
            ]
        }

        // when user sends or receives a message, this appends it to its channel messages
        this.addNewMsg = this.addNewMsg.bind(this);

        /* once a new message is added to allMessages, this checks if the state for the 
          current channel's messages needs to update */
        this.updateMessagesState = this.updateMessagesState.bind(this);

        // socket.IO connection with the application server
        this.socket = null;

        // socket.IO connection setup
        this.socketSetup = this.socketSetup.bind(this);

        // appends new message from user to list, then sends to server
        this.sendMsgToServer = this.sendMsgToServer.bind(this);

        // on user signout, deletes the authentication data & displays <SigningOut />
        this.userSignout = this.userSignout.bind(this);

        /* on user signout (after <SigningOut /> is displayed),
           sets a timeout before redirecting to homepage */
        this.signoutRedirect = this.signoutRedirect.bind(this);



        // current channel selected & component displayed (default #general channel)
        this.state = {
            channel: {
                name: '#general', // name of selected channel
                messages: this.allMessages['#general'], // messages from selected channel
            },

            viewComponent: <DisplayUserProfile channelInfo={{name: '#general', messages: this.allMessages['#general']}}
                                               sendNewMsg={this.sendMsgToServer} signout={this.userSignout} /> 
        };
    }

    componentDidMount() {
        this.socketSetup();
    }

    addNewMsg(msg) {
        const { channel } = msg; // channel the current message is intended for

        if ( this.allMessages[channel] === undefined ) { // channel doesn't exist yet
            this.allMessages[channel] = []; // creates channel with no entries
        }

        // adds new message to channel
        this.allMessages[channel].push({
            username: msg.username,
            text: msg.text,
            timestamp: msg.timestamp
        });

        this.updateMessagesState(channel); // checks if selected channel's messages should update
    }

    updateMessagesState(channel) {
        // new message is from the current channel
        if ( channel === this.state.channel.name ) {
            let updatedChannel = this.state.channel;
            updatedChannel.messages = this.allMessages[channel];
            
            // updates messages from current channel & the displayed component
            this.setState({ 
                channel: updatedChannel,
                viewComponent: <DisplayUserProfile channelInfo={{name: channel, messages: this.allMessages[channel]}}
                                               sendNewMsg={this.sendMsgToServer} signout={this.userSignout} /> 
            });
        }
    }

    socketSetup() {
        const app_server = 'http://localhost:8081';
        this.socket = io(app_server);

        this.socket.on('server.test', msg => {
            console.log(`Server msg: ${JSON.stringify(msg)}`);

            setTimeout(() => {
                this.socket.emit('user.test', {
                    test: 'Ayyyy serverrr'
                });
            }, 5000);
        });
    }

    sendMsgToServer(msg) {
        this.addNewMsg(msg); // appends new message to channel's messages

        // sends message to the server
    }

    userSignout() {
        this.props.signout(); // deletes authentication data        
        this.setState({ viewComponent: <SigningOut /> }, () => this.signoutRedirect() );
    }

    signoutRedirect() {
        setTimeout(() => {
            this.setState({ viewComponent: <Redirect to='/' /> });
        }, 2000);
    }

    render() {
        return ( this.state.viewComponent );
    }
}

const UserProfileContext = (props) => {
    return (
        <AuthenticationContext.Consumer>
            { ({ signout }) => (
                <UserProfile {...props} signout={signout} />
            )}
        </AuthenticationContext.Consumer>
    );
};

export default UserProfileContext;