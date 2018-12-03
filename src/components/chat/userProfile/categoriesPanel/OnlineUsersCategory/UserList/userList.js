import React, { PureComponent } from 'react';
import UserItem from './userItem/userItem';

class UserList extends PureComponent {
    render() {
        console.log(`userList re-render: ${JSON.stringify(this.props.userList)}\n`);

        const list = Object.keys(this.props.userList).map(user => (
            <UserItem key={user} userId={this.props.userList[user].socketId} username={this.props.userList[user].username} />
        ));

        return (
            <ul id={`online-users-list`} className='category-channels-list' onClick={this.props.onUserSelect}>
                {list}
            </ul>
        );
    }
}

export default UserList;