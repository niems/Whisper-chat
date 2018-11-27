import React, {Component} from 'react';
import io from 'socket.io-client';
import AuthenticationContext from '../../authentication/authenticationContext';
import DisplayUserProfile from './displayUserProfile/displayUserProfile';
import Signout from './signout/signout';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        
        // REMOVE AND UPDATE FUNCTIONS THAT MODIFY THIS TO INSTEAD MODIFY this.allChannelData
        // stores messages from all the channels
        this.allMessages = {
            "#general": [ // default channel
                { // test message
                    username: 'Rick',
                    text: 'Wubba lubba dub dub! ',
                    timestamp: (new Date()).toUTCString()
                }
            ],

            "#random": [
                { // test message
                    username: 'ThatOneGuy',
                    text: 'Ayyyyy! ',
                    timestamp: (new Date()).toUTCString()
                }
            ]
        }
        



        // stores all channel categories --> channels (within category) --> messages (within channel)
        this.allChannelData = {
            'Groups': {
                'general': [ // default channel (displayed on first chat-view render). all users subscribed to this on connection
                    { // test message
                        username: 'Rick',
                        text: 'Wubba lubba dub dub! ',
                        timestamp: (new Date()).toUTCString()
                    }
                ],

                'random': [ // all users subscribed to this on connection
                    { // test message
                        username: 'ThatOneGuy',
                        text: 'Ayyyyy! ',
                        timestamp: (new Date()).toUTCString()
                    }
                ],

                'listenHereGuy': [] // testing - user defined group
            },

            'PMs': {
                'Jerry': [
                    {
                        username: 'Jerry',
                        text: 'Is this thing on?',
                        timestamp: (new Date()).toUTCString()
                    }
                ],

                'BirdPerson': [
                    {
                        username: 'BirdPerson',
                        text: 'This is considered a dick move',
                        timestamp: (new Date()).toUTCString()
                    }
                ]
            }
        };

        // test online users - will be synced with server after testing
        this.allOnlineUsers = [
            'Rick',
            'Morty',
            'BirdPerson',
            'Jerry',
        ];
        
        // currently not being used. May use this for imperative animation, but might just move to css
        this.allChannelRefs = {
            "Groups": React.createRef(),
            "PMs": React.createRef(),
            "Online Users": React.createRef(),
        };
        
        this.onChannelSelect = this.onChannelSelect.bind(this); // channel clicked in categoriesPanel
        this.channelsRef = React.createRef(); // reference to the channels section of the categoriesPanel

        // when user sends or receives a message, this appends it to its channel messages
        this.addNewMsg = this.addNewMsg.bind(this);

        /* creates a new channel if the user creates a new channel or receives a message 
           on a channel that isn't stored in this.allMessages */
        this.createChannel = this.createChannel.bind(this);

        // adds the new message to this.allMessages
        this.addMsgToAllMessages = this.addMsgToAllMessages.bind(this);

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

        // current channel selected & component displayed (default #general channel)

        this.state = {
            channel: {
                name: '#general', // name of selected channel
                messages: this.allMessages['#general'], // messages from selected channel
            },

            isSigningOut: false, // determines if the sign out screen is displayed
            allChannels: Object.keys( this.allMessages ), // all the channels currently stored
        };
    }

    componentDidMount() {
        this.socketSetup();
    }

    onChannelSelect(e) {
        e.preventDefault();
        console.log(`onChannelSelect() target id: ${e.target.id}`);
        console.log(`onChannelSelect() current target id: ${e.currentTarget.id}\n\n`);
    }

    addNewMsg(msg) {
        const { channel } = msg; // channel the current message is intended for

        this.createChannel(channel); // creates channel if it doesn't exist
        this.addMsgToAllMessages(msg); // adds message to this.allMessages
        this.updateMessagesState(channel); // checks if selected channel's messages should update
    }

    createChannel(channel) {
        if ( this.allMessages[channel] === undefined ) { // channel doesn't exist yet
            this.allMessages[channel] = []; // creates channel
        }
    }

    addMsgToAllMessages(msg) {
        this.allMessages[msg.channel].push({ // adds new message to channel
            username: msg.username,
            text: msg.text,
            timestamp: msg.timestamp
        });
    }

    updateMessagesState(channel) {
        if ( channel === this.state.channel.name ) { // new message is from the current channel
            let updatedChannel = this.state.channel;
            updatedChannel.messages = this.allMessages[channel];

            this.setState({ channel: updatedChannel });
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
        this.setState({ isSigningOut: true }); // displays the signout screen, then redirects to homepage
    }

    render() {
        const display = this.state.isSigningOut ? (<Signout />) :
            (<DisplayUserProfile channelInfo={this.state.channel} sendNewMsg={this.sendMsgToServer} allChannelRefs={this.allChannelRefs}
                                 allOnlineUsers={this.allOnlineUsers} onChannelSelect={this.onChannelSelect}  signout={this.userSignout} />);

        return display;
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