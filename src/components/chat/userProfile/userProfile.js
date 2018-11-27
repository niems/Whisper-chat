import React, {Component} from 'react';
import io from 'socket.io-client';
import AuthenticationContext from '../../authentication/authenticationContext';
import DisplayUserProfile from './displayUserProfile/displayUserProfile';
import Signout from './signout/signout';

class UserProfile extends Component {
    constructor(props) {
        super(props);      

        // stores all channel categories --> channels (within category) --> messages (within channel)
        this.allChannelData = {
            'Groups': {
                'general': [ // default channel (displayed on first chat-view render). all users subscribed to this on connection
                    { // test message
                        username: 'BirdPerson',
                        text: 'In bird culture, this is considered a dick move',
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
                        text: 'You appear to be dying. I will make efforts to prevent this, but can promise nothing.',
                        timestamp: (new Date()).toUTCString()
                    }
                ]
            }
        };

        // (probably move this to state...) test online users - will be synced with server after testing
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
        
        // channel clicked in categoriesPanel
        this.onChannelSelect = this.onChannelSelect.bind(this); 

        // when user sends or receives a message, this appends it to its channel messages
        this.addNewMsg = this.addNewMsg.bind(this);

        /* creates a new channel if the user creates a new channel or receives a message 
           on a channel that isn't stored in this.allMessages */
        this.createChannel = this.createChannel.bind(this);

        // adds the new message to the specified channel
        this.addMsgToChannel = this.addMsgToChannel.bind(this);

        /* once a new message is added to allChannelData[category][channel],
         this checks if the state for the selected channel's messages needs to update */
        this.updateSelectedChannelMessages = this.updateSelectedChannelMessages.bind(this);


        // socket.IO connection with the application server
        this.socket = null;

        // socket.IO connection setup
        this.socketSetup = this.socketSetup.bind(this);

        // appends new message from user to list, then sends to server
        this.sendMsgToServer = this.sendMsgToServer.bind(this);

        // on user signout, deletes the authentication data & displays <SigningOut />
        this.userSignout = this.userSignout.bind(this);

        
        this.state = {
            isSigningOut: false, // determines if the sign out screen is displayed

            selectedChannel: { // info about selected channel (displayed in chatView)
                category: 'Groups', // category channel data exists: can be either "Groups" or "PMs"
                name: 'general', // name of selected channel
                messages: this.allChannelData['Groups']['general'], // messages from selected channel
            },

            allChannels: { // all channels for each of the two groups
                "Groups": Object.keys( this.allChannelData['Groups'] ),
                "PMs": Object.keys( this.allChannelData['PMs'] )
            }
        };
    }

    componentDidMount() {
        this.socketSetup();
    }

    onChannelSelect(e) {
        e.preventDefault();
        console.log(`onChannelSelect() current target id: ${e.currentTarget.id}`);
        console.log(`onChannelSelect() target id: ${e.target.id}\n\n`);

        /*
        // update selectedChannel state ONLY if a new channel is selected
        if ( !( e.currentTarget.id === this.state.selectedChannel.category && e.target.id === this.state.selectedChannel.name) ) {

        }
        */
    }

    addNewMsg(msg) { // need category to be included in msg to determine where to add msg
        const { category, channel } = msg; // channel the current message is intended for

        this.createChannel(category, channel); // creates channel if it doesn't exist
        this.addMsgToChannel(msg); //adds message to this.channelData[category][channel]
        this.updateSelectedChannelMessages(channel); // updates selected channel's msgs ONLY if a new msg was added
    }
    

    // creates channel with no messages if it doesn't exist
    createChannel(category, channel) {
        if ( this.allChannelData[category][channel] === undefined ) { //channel doesn't exist
            this.allChannelData[category][channel] = []; // creates channel
        }
    }

    // appends new message to specified channel
    addMsgToChannel(msg) {
        this.allChannelData[msg.category][msg.channel].push({
            username: msg.username,
            text: msg.text,
            timestamp: msg.timestamp
        });
    }

    updateSelectedChannelMessages(channel) {
        if ( channel === this.state.selectedChannel.name ) { // new msg from selected channel
            const { category, name } = this.state.selectedChannel;
            const selectedChannel = {
                category: category,
                name: name,
                messages: this.allChannelData[category][name] // use new msg list
            };

            this.setState({ selectedChannel });
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
            (<DisplayUserProfile channelInfo={this.state.selectedChannel} sendNewMsg={this.sendMsgToServer} allChannelRefs={this.allChannelRefs}
                                 allChannels={this.state.allChannels} allOnlineUsers={this.allOnlineUsers} onChannelSelect={this.onChannelSelect}  signout={this.userSignout} />);

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