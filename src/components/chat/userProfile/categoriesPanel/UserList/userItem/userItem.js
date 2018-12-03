import React, { PureComponent } from 'react';

class UserItem extends PureComponent {
   render() {
       console.log(`user item re-render: ${JSON.stringify(this.props)}\n`);
       
      return (
         <li id={this.props.userId} className='channel'>{this.props.username}</li>
      );
   }
}

export default UserItem;