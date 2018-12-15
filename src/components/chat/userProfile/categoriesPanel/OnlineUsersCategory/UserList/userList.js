import React, { PureComponent } from 'react';
import UserItem from './userItem/userItem';

class UserList extends PureComponent {
  render() {
    return (
      <ul
        id={'online-users-list'}
        className="category-channels-list"
        onClick={this.props.onUserSelect}
      >
        {Object.keys(this.props.userList).map(user => (
          <UserItem
            key={user}
            userId={this.props.userList[user].socketId}
            username={this.props.userList[user].username}
          />
        ))}
      </ul>
    );
  }
}

export default UserList;
