import React, { Component } from 'react';
import NotificationContext from './notificationContext/notificationContext';

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false, // determines if the notification is displayed
            msg: '', // notification message to display
        };

        // creates the new notification
        this.newNotification = this.newNotification.bind(this);

        // displays the notification if it's active
        this.displayNotification = this.displayNotification.bind(this);
    }

    newNotification(msg, duration) {
        this.setState({
            isActive: true,
            msg: msg,
            //duration: duration
        });

        // notification becomes inactive after the duration has elapsed
        setTimeout(() => {
            this.setState({
                isActive: false,
                msg: ''
            });
        }, duration);
    }

    displayNotification() {
        // notification isn't active
        if ( !this.state.isActive ) {
            return null;
        }

        return (
            <div className='notification'>{this.state.msg}</div>
        );
    }

    render() {        
        return (
            <Notification.Provider value={{
                isActive: this.state.isActive,
                msg: this.state.msg,
                newNotification: this.newNotification
            }}>

                {this.displayNotification()}
            </Notification.Provider>
        );
    }
}

export default Notification;