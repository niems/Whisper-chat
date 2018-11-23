import React, { Component } from 'react';
import NotificationContext from './notificationContext/notificationContext';



// returns the notification msg if it's active
const DisplayNotification = ({ isActive, msg }) => {
    const display = isActive ? (<div className='notification'>{msg}</div>) : null;
    return (display);
}

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
        //this.displayNotification = this.displayNotification.bind(this);
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

    render() {        
        return (
            <NotificationContext.Provider value={{
                isActive: this.state.isActive,
                msg: this.state.msg,
                newNotification: this.newNotification
            }}>

                <DisplayNotification isActive={this.state.isActive} msg={this.state.msg} />
            </NotificationContext.Provider>
        );
    }
}

export default Notification;