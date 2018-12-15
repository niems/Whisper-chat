import React from 'react';
import UserList from './UserList/userList';

const OnlineUsersCategory = ({ channelRef, onUserSelect, userList }) => {
  return (
    <React.Fragment>
      <h2 className="category-section-header">Online Users</h2>
      <div className="category-section">
        <UserList
          channelRef={channelRef}
          onUserSelect={onUserSelect}
          userList={userList}
        />
      </div>
    </React.Fragment>
  );
};

export default OnlineUsersCategory;
