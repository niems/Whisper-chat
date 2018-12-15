import React, { PureComponent } from 'react';

class UserItem extends PureComponent {
  render() {
    return (
      <li
        id={this.props.username}
        data-socketid={this.props.userId}
        className="channel"
      >
        {this.props.username}
      </li>
    );
  }
}

export default UserItem;
