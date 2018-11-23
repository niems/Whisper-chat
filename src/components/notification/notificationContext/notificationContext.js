import React from 'react';

const NotificationContext = React.createContext({
    isActive: false, // determines if the notification is being displayed
    msg: '', // notification message
    duration: 0, // duration in ms

    newNotification: () => {},
    displayNotification: () => {}
});

export default NotificationContext;