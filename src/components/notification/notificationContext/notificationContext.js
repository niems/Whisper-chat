import React from 'react';

const NotificationContext = React.createContext({
    isActive: false, // determines if the notification is being displayed
    msg: '', // notification message

    newNotification: () => {},
});

export default NotificationContext;