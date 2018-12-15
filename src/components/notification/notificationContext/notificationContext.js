import React from 'react';

// add a "display type" attribute so it can be used for request verification / errors as well as inputfield errors
const NotificationContext = React.createContext({
  isActive: false, // determines if the notification is being displayed
  msg: '', // notification message

  newNotification: () => {}
});

export default NotificationContext;
