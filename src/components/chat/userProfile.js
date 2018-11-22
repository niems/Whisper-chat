import React, {Component, lazy} from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import AuthenticationContext from '../authentication/authenticationContext';
import ChannelsPanel from './channelsPanel/channelsPanel';
import ChatView from './chatView/chatView';


// lazy load this!
const DisplayUserProfile = ({ channel, signout }) => {
    return (
        <article id='profile'>
            <ChannelsPanel signout={signout} />
            <ChatView channel={channel} />
        </article>
    );
};

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
        // socket.IO connection with the application server
        this.socket = null;

        // socket.IO connection setup
        this.socketSetup = this.socketSetup.bind(this);

        // sends message to server
        this.sendToServer = this.sendToServer.bind(this);

        // on user signout, deletes the authentication data & displays <SigningOut />
        this.userSignout = this.userSignout.bind(this);

        /* on user signout (after <SigningOut /> is displayed),
           sets a timeout before redirecting to homepage */
        this.signoutRedirect = this.signoutRedirect.bind(this);

        // current channel selected & component displayed
        this.state = {
            currentChannel: '#general', 
            viewComponent: <DisplayUserProfile channel='#general' signout={this.userSignout} /> 
        };
    }

    componentDidMount() {
        this.socketSetup();
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

    sendToServer() {
        
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