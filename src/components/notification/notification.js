import React, { Component } from 'react';
import NotificationContext from './notificationContext/notificationContext';

// returns the notification msg if it's active, otherwise null
const DisplayNotification = ({ isActive, msg, duration, type }) => {
  return isActive ? (
    <p
      className={`notification ${type}`}
      style={{ animationDuration: `${duration}ms` }}
    >
      {msg}
    </p>
  ) : null;
};

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false, // determines if the notification is displayed
      msg: '', // notification message to display
      duration: 0, // how long the notification lasts in ms
      type: '' // (optional) error/success will change the color to red or green, respectively
    };

    // timeout id (clears when a new ID is set if one is currently active)
    this.timerID = null;

    // creates the new notification
    this.newNotification = this.newNotification.bind(this);

    // setup for new notification
    this.newNotificationSetup = this.newNotificationSetup.bind(this);

    // the previous notification is still active and needs to be removed first
    this.previousNotificationActive = this.previousNotificationActive.bind(
      this
    );
  }

  newNotification(msg, duration, type = '') {
    this.previousNotificationActive()
      .then(() => this.newNotificationSetup(msg, duration, type))
      .catch(err => console.error(err));
  }

  newNotificationSetup(msg, duration, type) {
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

  previousNotificationActive() {
    return new Promise(resolve => {
      if (this.state.isActive) {
        // previous notification still active
        clearTimeout(this.timerID);
        this.timerID = null;

        this.setState(
          {
            isActive: false
          },
          () => {
            resolve(); //clears old notification before adding new one
          }
        );
      } else {
        resolve(); // no notification currently active
      }
    });
  }

  render() {
    return (
      <NotificationContext.Provider
        value={{
          isActive: this.state.isActive,
          msg: this.state.msg,
          newNotification: this.newNotification
        }}
      >
        {this.props.children}
        <DisplayNotification
          isActive={this.state.isActive}
          msg={this.state.msg}
          duration={this.state.duration}
          type={this.state.type}
        />
      </NotificationContext.Provider>
    );
  }
}

export default Notification;
