import React, { Component } from 'react';
import NotificationContext from './notificationContext/notificationContext';



// returns the notification msg if it's active
const DisplayNotification = ({ isActive, msg }) => {
    console.log('DisplayNotification() enter');
    
    const display = isActive ? (<p className='notification'>{msg}</p>) : null;
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
        console.log('newNotification(): ');
        console.log(`\tmsg: ${msg}`);
        console.log(`\tduration: ${duration}\n`);

        this.setState({
            isActive: true,
            msg: msg,
        });

        // notification becomes inactive after the duration has elapsed
        setTimeout(() => {
            console.log('newNotification deactivating');

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

                {this.props.children}
                <DisplayNotification isActive={this.state.isActive} msg={this.state.msg} />
            </NotificationContext.Provider>
        );
    }
}

export default Notification;