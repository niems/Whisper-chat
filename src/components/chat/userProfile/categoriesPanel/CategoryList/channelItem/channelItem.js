import React, { PureComponent } from 'react';

class ChannelItem extends PureComponent {
   render() {
      return (
         <li id={this.props.channel} className='channel'>{this.props.channel}</li>
      );
   }
}

export default ChannelItem;