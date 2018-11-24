import React, { Component } from 'react';
import NotificationContext from './notificationContext/notificationContext';

// returns the notification msg if it's active, otherwise null
const DisplayNotification = ({ isActive, msg, duration, type }) => {    
    return (
        isActive ? 
        (<p className={`notification ${type}`}
            style={{animationDuration: `${duration}ms`}}>{msg}</p>) : null
    );
}

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false, // determines if the notification is displayed
            msg: '', // notification message to display
            duration: 0, // how long the notification lasts in ms
            type: '', // (optional) error/success will change the color to red or green, respectively
        };

        // timeout id (clears when a new ID is set if one is currently active)
        this.timerID = null;

        // creates the new notification
        this.newNotification = this.newNotification.bind(this);
    }

    newNotification(msg, duration, type='') {
        if ( this.state.isActive ) { // resets timerID
            clearTimeout( this.timerID );
            this.timerID = null;
        }

        this.setState({
            isActive: true,
            msg: msg,
            duration: duration,
            type: type
        });

        // notification becomes inactive after the duration has elapsed
        this.timerID = setTimeout(() => {
            this.setState({
                isActive: false,
                msg: '',
                duration: 0,
                type: ''
            });
        }, duration);
    }

    render() {        
        return (
            <NotificationContext.Provider value={{
                isActive: this.state.isActive,
                msg: this.state.msg,
                newNotification: this.newNotification
            }}>

                {this.props.children}
                <DisplayNotification isActive={this.state.isActive} msg={this.state.msg}
                                     duration={this.state.duration} type={this.state.type} />

            </NotificationContext.Provider>
        );
    }
}

export default Notification;