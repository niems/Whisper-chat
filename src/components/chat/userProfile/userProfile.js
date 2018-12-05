import React, {Component} from 'react';
import comms from './comms/comms';
import AuthenticationContext from '../../authentication/authenticationContext';
import CategoriesPanel from './categoriesPanel/categoriesPanel';
import ChatView from './chatView/chatView';
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
                    },

                    { // test message
                        username: 'Morty',
                        text: 'Ah jeez!',
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

        
        // deletes the current channel & updates allChannels state, given the category and channel name
        this.deleteChannel = this.deleteChannel.bind(this);

        // adds the new message to the specified channel
        this.addMsgToChannel = this.addMsgToChannel.bind(this);

        /* once a new message is added to allChannelData[category][channel],
         this checks if the state for the selected channel's messages needs to update */
        this.updateSelectedChannelMessages = this.updateSelectedChannelMessages.bind(this);

        // updates the allChannels state when a new channel is added
        this.updateAllChannels = this.updateAllChannels.bind(this);

        // updates the current onlineUsers state when a user connects, disconnects, or when you initially get the user list
        this.updateOnlineUsers = this.updateOnlineUsers.bind(this);

        // socket.IO connection with the application server
        this.socket = null;

        // socket.IO connection setup
        this.socketSetup = this.socketSetup.bind(this);

        // appends new message from user to list, then sends to server
        this.sendMsgToServer = this.sendMsgToServer.bind(this);

        // msg received from server - either from a group or a specific user
        this.onMsgReceived = this.onMsgReceived.bind(this);

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
            },

            onlineUsers: {} // updated after initial socket connection
        };
    }

    componentDidMount() {
        this.socketSetup();
    }

    componentWillUnmount() {
        this.socket.close(); // disconnects from server
    }

    onChannelSelect(e) {
        e.preventDefault();
        console.log('onChannelSelect()');

        // update selectedChannel state ONLY if a new channel is selected
        if ( e.target.id !== this.state.selectedChannel.name && e.currentTarget.id !== e.target.id ) {
            let newCategory = e.currentTarget.id.replace('-list', ''); // category selected
            let newChannel = e.target.id; // channel selected

            console.log(`\tcategory: ${newCategory}`);
            console.log(`\tchannel: ${newChannel}\n`);

            //  user selected the online users category, which is saved in the PMs category
            if ( newCategory === 'online-users' ) {
                newCategory = 'PMs';

                console.log(`\tdata id: ${e.target.getAttribute('data-socketid')}\n`);
            }

            // if no messages were sent / received on the current channel, remove it from the channel list
            if ( this.state.selectedChannel.messages.length === 0 ) {
                this.deleteChannel(this.state.selectedChannel.category, this.state.selectedChannel.name);
            }

            this.createChannel(newCategory, newChannel); // creates a new channel if one doesn't exist

            const selectedChannel = {
                category: newCategory,
                name: newChannel,
                messages: this.allChannelData[newCategory][newChannel]
            };

            this.setState({ selectedChannel });
        }
        
        else {
            console.log('same channel selected');
        }
    }

    // adds new message to specified channel
    addNewMsg(msg) { 
        const { category, channel } = msg; // channel the current message is intended for

        this.createChannel(category, channel); // creates channel if it doesn't exist
        this.addMsgToChannel(msg); //adds message to this.channelData[category][channel]
        this.updateSelectedChannelMessages(channel); // updates selected channel's msgs ONLY if a new msg was added
    }
    
    // creates channel with no messages if it doesn't exist & updates allChannels state
    createChannel(category, channel) {
        if ( this.allChannelData[category][channel] === undefined ) { //channel doesn't exist
            this.allChannelData[category][channel] = []; // creates channel

            this.updateAllChannels(category, channel); // updates allChannels state
        }
    }

    // deletes the current channel & updates allChannels state, given the category and channel name
    deleteChannel(category, channel) {
        delete this.allChannelData[category][channel]; // deletes the specified channel
        this.updateAllChannels(category); // updates the allChannel state
    }

    // appends new message to specified channel
    addMsgToChannel(msg) {
        this.allChannelData[msg.category][msg.channel].push({
            username: msg.username,
            text: msg.text,
            timestamp: msg.timestamp
        });
    }

    // updates selected channel messages state when a new message is added to the selected channel
    updateSelectedChannelMessages(channel) {
        if ( channel === this.state.selectedChannel.name ) { // new msg from selected channel
            const selectedChannel = this.state.selectedChannel;
            const { category, name } = this.state.selectedChannel;
            selectedChannel.messages = this.allChannelData[category][name]; // use new msg list

            this.setState({ selectedChannel });
        }
    }

    // updates the state of allChannels - called when a new channel is added or a channel is deleted
    updateAllChannels(category) {
        const allChannels = {...this.state.allChannels}; // gets current allChannels state to modify

        if ( this.isGroupMsg(category) ) { // updating Groups category
            allChannels['Groups'] = Object.keys( this.allChannelData['Groups'] );
        }

        else { // updating PMs category
            allChannels['PMs'] = Object.keys( this.allChannelData['PMs'] );
        }

        this.setState({ allChannels });
    }

    updateOnlineUsers(users) {
        const onlineUsers = {...users};
        this.setState({ onlineUsers });
    }

    isGroupMsg(category) {
        if ( category === 'Groups' ) { // msg is for the Groups category
            return true;
        }

        return false; // msg if for the PMs category
    }

    socketSetup() {
        const app_server = 'http://localhost:8081';
        this.socket = comms(this.props.username, app_server, this.onMsgReceived);

        // joins all the group channels initially in state
        this.socket.join( this.state.allChannels.Groups ); 
    }

    sendMsgToServer(msg) {
        this.addNewMsg(msg); // appends new message to channel's messages

        // sends message to the server
        // send to the specified room based on the msg here
        console.log(`sendMsgToServer() msg: ${JSON.stringify(msg)}\n`);

        if ( this.isGroupMsg(msg.category) ) { // send as group msg to server
            this.socket.sendGroupMsg(msg);
        }

        else { // send as PM msg to server
            // pulls the socketId of the user the message is being sent to for the server
            const sendTo = this.state.onlineUsers[msg.channel];

            if ( sendTo ) {
                this.socket.sendPrivateMsg({sendTo: sendTo.socketId, msg: msg});
            }

            else {
                console.log('user offline');
            }
        }
    }

    // received a message from the server
    onMsgReceived(type, data) {

        // new group message received
        if ( type === 'new group message' ) {
            this.addNewMsg( JSON.parse(data) );
        }

        // new private message received
        else if ( type === 'new private message' ) {
            data = JSON.parse(data);
            data.channel = data.username; // updates channel to user who sent message

            this.addNewMsg(data);
        }

        // update all online users state - initial server connection
        else if ( type === 'all online users' ) {
            this.updateOnlineUsers(data); 
        }

        //  new user joined - user object sent
        else if ( type === 'add online user' ) {
            const updatedOnlineUsers = this.state.onlineUsers;
            updatedOnlineUsers[data.username] = data; // adds the new online user

            this.updateOnlineUsers(updatedOnlineUsers); // updates onlineUsers state
        }

        // user disconnected - user id sent
        else if ( type === 'remove online user' ) {
            const updatedOnlineUsers = this.state.onlineUsers;
            delete updatedOnlineUsers[data]; // removes the disconnected user

            this.updateOnlineUsers(updatedOnlineUsers); // updates onlineUsers state
        }

    }

    userSignout() {
        this.props.signout(); // deletes authentication data        
        this.setState({ isSigningOut: true }); // displays the signout screen, then redirects to homepage
    }

    render() {
        return (
            this.state.isSigningOut ? 
            (<Signout />) :
            (
                <article id='profile'>
                    <CategoriesPanel allChannelRefs={this.allChannelRefs} allChannels={this.state.allChannels} username={this.props.username}
                                     allOnlineUsers={this.state.onlineUsers} onChannelSelect={this.onChannelSelect} signout={this.userSignout} />

                    <ChatView channelInfo={this.state.selectedChannel} sendNewMsg={this.sendMsgToServer} />
                </article>
            )
        );
    }
}

const UserProfileContext = (props) => {
    return (
        <AuthenticationContext.Consumer>
            { ({ isUserAuthenticated, signout }) => (
                <UserProfile {...props} username={isUserAuthenticated.username} signout={signout} />
            )}
        </AuthenticationContext.Consumer>
    );
};

export default UserProfileContext;